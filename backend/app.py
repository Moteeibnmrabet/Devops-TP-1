import os
import time
import httpx
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from prompt import MOTEE_SYSTEM_PROMPT

# Load environment variables (.env)
load_dotenv()

app = FastAPI(
    title="MIM-AI Career Copilot API",
    description="Real LLM Backend for Motee Ibn M'rabet's Portfolio",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = None
    provider: Optional[str] = None # "groq", "openai", "ollama", "auto"

class ChatResponse(BaseModel):
    response: str
    model: str
    provider: str
    latency_ms: int

class HealthResponse(BaseModel):
    status: str
    active_provider: str
    model: str
    api_key_configured: bool


def get_llm_config():
    """Detect configured LLM provider and credentials."""
    groq_key = os.getenv("GROQ_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")
    ollama_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434/v1")

    if groq_key:
        return {
            "provider": "groq",
            "base_url": "https://api.groq.com/openai/v1",
            "api_key": groq_key,
            "model": os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")
        }
    elif openai_key:
        return {
            "provider": "openai",
            "base_url": "https://api.openai.com/v1",
            "api_key": openai_key,
            "model": os.getenv("OPENAI_MODEL", "gpt-4o-mini")
        }
    else:
        # Default fallback to Groq
        return {
            "provider": "groq",
            "base_url": "https://api.groq.com/openai/v1",
            "api_key": groq_key or "",
            "model": "openai/gpt-oss-120b"
        }


@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    cfg = get_llm_config()
    is_configured = bool(cfg["api_key"])
    return HealthResponse(
        status="online",
        active_provider=cfg["provider"],
        model=cfg["model"],
        api_key_configured=is_configured
    )


@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    user_msg = request.message.strip()
    if not user_msg:
        raise HTTPException(status_code=400, detail="Le message ne peut pas être vide.")

    cfg = get_llm_config()
    start_time = time.time()

    # Build standard OpenAI-compatible messages array
    messages = [{"role": "system", "content": MOTEE_SYSTEM_PROMPT}]

    if request.history:
        for item in request.history[-6:]:  # Keep recent context window
            if item.role in ["user", "assistant"]:
                messages.append({"role": item.role, "content": item.content})

    messages.append({"role": "user", "content": user_msg})

    print(f"\n[FASTAPI] 📩 User Message received: \"{user_msg}\"")
    print(f"[FASTAPI] 🤖 Selected Provider: {cfg['provider'].upper()} | Model: {cfg['model']}")

    # If API key is present, call the real LLM API (Groq, OpenAI, or Ollama)
    if cfg["api_key"] or os.getenv("OLLAMA_ACTIVE") == "true":
        headers = {
            "Authorization": f"Bearer {cfg['api_key']}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": cfg["model"],
            "messages": messages,
            "temperature": 0.4,
            "max_tokens": 800
        }

        print(f"[FASTAPI] 🚀 Sending request to {cfg['base_url']}/chat/completions ...")

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                resp = await client.post(
                    f"{cfg['base_url']}/chat/completions",
                    headers=headers,
                    json=payload
                )

            latency = int((time.time() - start_time) * 1000)

            if resp.status_code == 200:
                data = resp.json()
                bot_reply = data["choices"][0]["message"]["content"]
                usage = data.get("usage", {})
                tokens = usage.get("total_tokens", "N/A")
                print(f"[FASTAPI] ✅ Real Groq LLM Response received in {latency}ms (Total tokens: {tokens})")
                print(f"[FASTAPI] 💬 Preview: {bot_reply[:120]}...\n")
                return ChatResponse(
                    response=bot_reply,
                    model=cfg["model"],
                    provider=cfg["provider"],
                    latency_ms=latency
                )
            else:
                error_detail = resp.text
                print(f"[FASTAPI ERROR] Groq API returned HTTP {resp.status_code}: {error_detail}")
                raise HTTPException(
                    status_code=502,
                    detail=f"Erreur renvoyée par Groq ({resp.status_code}) : {error_detail}"
                )

        except httpx.RequestError as exc:
            print(f"[FASTAPI NETWORK ERROR] Impossible de contacter {cfg['base_url']}: {exc}")
            raise HTTPException(
                status_code=503,
                detail=f"Impossible de joindre le fournisseur LLM ({cfg['provider']}). Vérifiez votre connexion Internet."
            )
    else:
        latency = int((time.time() - start_time) * 1000)
        print("[FASTAPI WARNING] No GROQ_API_KEY found in backend/.env")
        fallback_msg = (
            f"**⚠️ Clé API Groq non configurée dans `backend/.env`**<br><br>"
            f"Le backend FastAPI a bien reçu votre question, mais il attend votre clé `GROQ_API_KEY` pour interroger **LLaMA 3.3 70B** en direct.<br><br>"
            f"**Pour l'activer en 30 secondes :**<br>"
            f"1. Obtenez une clé gratuite sur [console.groq.com/keys](https://console.groq.com/keys)<br>"
            f"2. Ouvrez le fichier `backend/.env`<br>"
            f"3. Définissez : `GROQ_API_KEY=gsk_votre_cle`<br>"
            f"4. Relancez le serveur `uvicorn app:app --reload`."
        )
        return ChatResponse(
            response=fallback_msg,
            model="config-pending",
            provider="local-fastapi",
            latency_ms=latency
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
