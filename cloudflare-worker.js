const ALLOWED_ORIGINS = new Set([
  'https://moteeibnmrabet.github.io',
  'http://localhost',
  'http://127.0.0.1'
]);

const MODEL = 'openai/gpt-oss-120b';

const SYSTEM_PROMPT = `Tu es MIM-AI, l'assistant du portfolio professionnel de Motee Ibn M'rabet.
Réponds dans la langue de l'utilisateur, avec précision et de façon professionnelle.
Utilise seulement les faits fournis ci-dessous. N'invente aucun chiffre, résultat, métrique, route API, responsabilité, déploiement, test, livrable ou technologie propre à un projet.
Une compétence listée dans la stack générale ne prouve pas qu'elle a été utilisée dans un projet particulier.
Virtuo est décrit comme une plateforme d'extraction de données comptables de formulaires fiscaux français CERFA, calcul de KPI financiers et recommandations basées sur des règles. N'affirme pas qu'il utilise un LLM ou RAG.
Si une information n'est pas indiquée, dis explicitement qu'elle n'est pas précisée.
Profil: Motee Ibn M'rabet, élève-ingénieur en 5e année Génie Informatique, option IA & Data Science à l'EMSI, Tanger, Maroc. Recherche un PFE de six mois dès février 2027, en IA/Data Science (NLP, LLM, Document AI/OCR, Vector Search/RAG, systèmes multimodaux, Data Engineering), mobilité Maroc, France, Europe ou télétravail.
Projets:
- Virtuo (2026, PFA avec Edge Consulting Paris): extraction de données de formulaires CERFA, calcul de KPI financiers et recommandations basées sur des règles. Stack documentée: React, FastAPI, Python, PostgreSQL, SQLAlchemy, Tesseract OCR, pdfplumber, PyPDF, Pandas, Docker.
- Intelligent CV / Job Matching System (2026): matching sémantique de profils et offres avec extraction documentaire, raisonnement LLM, embeddings denses de 768 dimensions, similarité cosinus. Stack: Python, FastAPI, LLaMA 3.3 70B (Groq API), Ollama (nomic-embed-text), pgvector, PostgreSQL, Tesseract OCR, DeepFace.
- Football & Fan Sentiment Predictive Analytics (2025): analyse de données historiques et sentiments de supporters avec modèles ML. Stack: Python, Scikit-learn, Pandas, Power BI.
- Movie Review Sentiment Analysis (2026): classification de critiques avec Bag-of-Words, TF-IDF et Scikit-learn. Stack: Python, Scikit-learn, Pandas, NumPy, Power BI.
Expériences: stage Data Science / AI chez Edge Consulting à Paris (juillet-août 2026), lié à la plateforme Virtuo; stage Software Engineering chez Yazaki Tanger (juillet 2025), application de gestion d'incidents machines, tableaux de bord KPI et rapports PDF automatisés.
Compétences générales: Python, FastAPI, REST, Docker, Git/GitHub Actions, Linux, Scikit-learn, PyTorch, TensorFlow, Pandas, NumPy, Spark, Hadoop, Kafka, Airflow, PostgreSQL, pgvector, LLaMA, Ollama, Groq, NLP, OCR et RAG.`;

function corsHeaders(origin) {
  const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : 'null';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function jsonResponse(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(origin),
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (url.pathname === '/api/health' && request.method === 'GET') {
      return jsonResponse({
        status: 'online',
        active_provider: 'groq',
        model: MODEL,
        api_key_configured: Boolean(env.GROQ_API_KEY)
      }, 200, origin);
    }

    if (url.pathname !== '/api/chat' || request.method !== 'POST') {
      return jsonResponse({ detail: 'Not found' }, 404, origin);
    }

    if (!env.GROQ_API_KEY) {
      return jsonResponse({ detail: 'Le secret GROQ_API_KEY n’est pas configuré.' }, 503, origin);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ detail: 'Corps JSON invalide.' }, 400, origin);
    }

    if (typeof body.message !== 'string' || !body.message.trim()) {
      return jsonResponse({ detail: 'Le champ message est obligatoire.' }, 400, origin);
    }

    const history = Array.isArray(body.history)
      ? body.history.slice(-6).filter(item =>
        item &&
        ['user', 'assistant'].includes(item.role) &&
        typeof item.content === 'string'
      )
      : [];

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: body.message.trim() }
    ];

    const startedAt = Date.now();
    let response;
    try {
      response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: MODEL,
          messages,
          temperature: 0.4,
          max_tokens: 800
        })
      });
    } catch {
      return jsonResponse({ detail: 'Impossible de joindre le fournisseur Groq.' }, 502, origin);
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return jsonResponse({
        detail: error.error?.message || `Groq a répondu avec le statut ${response.status}.`
      }, 502, origin);
    }

    const result = await response.json();
    const answer = result.choices?.[0]?.message?.content;
    if (typeof answer !== 'string') {
      return jsonResponse({ detail: 'Réponse Groq invalide.' }, 502, origin);
    }

    return jsonResponse({
      response: answer,
      model: MODEL,
      provider: 'groq',
      latency_ms: Date.now() - startedAt
    }, 200, origin);
  }
};
