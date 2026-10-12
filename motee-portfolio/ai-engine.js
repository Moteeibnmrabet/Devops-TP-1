/**
 * MIM-AI Career Copilot
 */

(function () {
  'use strict';

  // ==========================================
  // 1. KNOWLEDGE BASE & PROFILE ONTOLOGY
  // ==========================================
  const PROFILE = {
    name: "Motee Ibn M'rabet",
    title: "AI & Data Engineer / Research Engineer",
    status: "5th-year Engineering Student at EMSI (AI & Data Science)",
    location: "Tangier, Morocco (Mobile for PFE in France, Europe, or Remote)",
    pfe: {
      timing: "February 2027 (Projet de Fin d'Études / Final-Year Internship)",
      focus: "Research-oriented or Applied AI / Data Science (LLMs, NLP, Document AI, Vector Search, Multimodal)",
      availability: "Full-time 6-month internship starting Feb 2027"
    },
    email: "motee.ibnmrabet1@gmail.com",
    linkedin: "https://www.linkedin.com/in/motee-ibn-m-rabet-7955bb354/",
    skills: {
      nlp_llm: ["LLaMA 3.3 70B", "Ollama", "Groq API", "nomic-embed-text", "Embeddings", "pgvector", "TF-IDF", "Bag of Words", "Text Mining", "Sentiment Analysis", "Transformers", "Prompt Engineering", "RAG"],
      document_ai: ["Tesseract OCR", "PyMuPDF", "pdfplumber", "PyPDF", "DeepFace", "CERFA Extraction", "Document Parsing", "Computer Vision"],
      ml_data: ["Scikit-learn", "PyTorch", "TensorFlow", "Pandas", "NumPy", "Spark", "Hadoop", "Kafka", "Airflow", "ETL", "Predictive Analytics", "Feature Engineering"],
      backend_platform: ["FastAPI", "Python", "PostgreSQL", "SQLAlchemy", "JWT", "REST APIs", "Docker", "CI/CD", "Linux", "React", "JavaScript", "MySQL", "MongoDB"],
      cloud_devops: ["Docker", "Git / GitHub Actions", "CI/CD", "GCP", "Azure", "Linux"]
    },
    projects: [
      {
        id: "virtuo",
        name: "Intelligent Financial Analysis Platform",
        year: "2026 · PFA",
        summary: "Automatic extraction of accounting data from French CERFA tax documents, financial KPI computation, dashboarding and rule-based recommendations.",
        stack: ["React", "FastAPI", "Python", "PostgreSQL", "SQLAlchemy", "Tesseract OCR", "pdfplumber", "Pandas", "Docker"],
        url: "projects/virtuo.html"
      },
      {
        id: "cv-job-matching",
        name: "Intelligent CV / Job Matching System",
        year: "2026",
        summary: "AI platform connecting candidate profiles and job offers through document extraction, LLM reasoning, embeddings and vector similarity search.",
        stack: ["Python", "FastAPI", "LLaMA 3.3 70B", "Ollama", "pgvector", "PostgreSQL", "Tesseract OCR", "DeepFace"],
        url: "projects/cv-job-matching.html"
      },
      {
        id: "football-analytics",
        name: "Predictive Analytics — Football & Fan Sentiment",
        year: "2025",
        summary: "Historical-data analysis combining fan reactions and machine-learning models for match-outcome prediction, with an interactive performance dashboard.",
        stack: ["Python", "Scikit-learn", "Pandas", "Power BI"],
        url: "projects/football-analytics.html"
      },
      {
        id: "movie-sentiment",
        name: "Movie Review Sentiment Analysis",
        year: "2026",
        summary: "Text-mining pipeline for movie-review classification using bag-of-words and TF-IDF representations.",
        stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Power BI"],
        url: "projects/movie-sentiment.html"
      }
    ],
    experiences: [
      {
        company: "Edge Consulting",
        role: "Data Science / AI Intern",
        location: "Paris, France",
        period: "Jul–Aug 2026",
        details: "Designed and developed the Virtuo platform for French CERFA document OCR extraction, financial KPI engine, FastAPI backend, and Dockerized deployment."
      },
      {
        company: "Yazaki Tanger",
        role: "Software Engineering Intern",
        location: "Tangier, Morocco",
        period: "Jul 2025",
        details: "Engineered a machine-incident management web application with KPI dashboards by department/period and automated PDF reporting."
      },
      {
        company: "EMSI",
        role: "State Engineering Degree in AI & Data Science",
        location: "Tangier, Morocco",
        period: "2022–Present",
        details: "Final-year engineering student building deep expertise in ML, Deep Learning, NLP, Data Engineering, and production software systems."
      }
    ]
  };

  // ==========================================
  // 2. SEMANTIC JOB MATCHING ENGINE
  // ==========================================
  const SKILL_MAP = {
    "LLM & NLP": {
      weight: 1.3,
      keywords: ["llm", "llama", "groq", "ollama", "nlp", "transformers", "bert", "gpt", "rag", "embeddings", "vector", "nomic", "tokenization", "text mining", "sentiment", "langchain", "prompt"],
      moteeHighlights: ["LLaMA 3.3 70B & Ollama integration", "Dense vector embeddings (768D)", "Text mining & TF-IDF / BoW pipelines"]
    },
    "Vector Search & DB": {
      weight: 1.2,
      keywords: ["pgvector", "vector search", "postgresql", "sql", "database", "sqlalchemy", "embeddings", "cosine similarity", "mongodb", "mysql"],
      moteeHighlights: ["PostgreSQL + pgvector semantic retrieval", "SQLAlchemy relational modeling", "Optimized vector indexing"]
    },
    "Document AI & OCR": {
      weight: 1.2,
      keywords: ["ocr", "tesseract", "pymupdf", "pdfplumber", "pypdf", "document ai", "computer vision", "deepface", "cerfa", "parsing", "extraction", "pdf", "image"],
      moteeHighlights: ["French CERFA tax document extraction pipeline", "Tesseract OCR & PyMuPDF text parsing", "DeepFace visual processing"]
    },
    "Machine Learning & Data": {
      weight: 1.1,
      keywords: ["scikit-learn", "pytorch", "tensorflow", "pandas", "numpy", "machine learning", "deep learning", "spark", "hadoop", "kafka", "airflow", "etl", "predictive", "power bi", "data science"],
      moteeHighlights: ["Supervised ML & sentiment classification", "Feature engineering & predictive modeling", "Big Data pipelines (Spark, Kafka, Airflow)"]
    },
    "Backend, APIs & DevOps": {
      weight: 1.1,
      keywords: ["fastapi", "python", "docker", "rest", "api", "jwt", "ci/cd", "git", "linux", "react", "javascript", "deployment", "gcp", "azure"],
      moteeHighlights: ["Production FastAPI backend architecture with JWT", "Docker containerization & CI/CD workflows", "Modern React frontend integration"]
    }
  };

  const JOB_PRESETS = {
    research_llm: {
      title: "AI Research Engineer — NLP & LLM Systems",
      text: `We are seeking an AI Research Engineer for our applied AI lab.
Key responsibilities:
- Design end-to-end NLP & LLM architectures using modern open-source models (LLaMA, Ollama, Transformers).
- Build dense vector search pipelines with pgvector, PostgreSQL and semantic embeddings.
- Develop RAG pipelines and intelligent reasoning agents.
- Deploy robust production APIs in Python with FastAPI and Docker.
Required: Python, PyTorch/Scikit-learn, LLMs, NLP, Vector DBs, FastAPI, Git.`
    },
    data_ml: {
      title: "Data Scientist / Applied ML Engineer",
      text: `We are looking for a Data Scientist / Machine Learning Engineer to build predictive models and analytics pipelines.
Key responsibilities:
- Perform advanced data processing, feature engineering, and predictive modeling using Scikit-learn and Pandas.
- Build text mining and sentiment analysis pipelines on unstructured customer feedback.
- Design interactive KPI dashboards and analytics reporting tools (Power BI, Python).
- Work with big data tools (Spark, Kafka, Airflow, SQL).
Required: Python, Scikit-learn, Pandas, NumPy, SQL, ML classification, Data Engineering.`
    },
    document_ai: {
      title: "Document AI & Fullstack Python Engineer",
      text: `Looking for an Engineer specialized in Document AI and automated data extraction.
Key responsibilities:
- Build automated OCR and PDF extraction pipelines (Tesseract, PyMuPDF, pdfplumber) for complex financial/tax documents (CERFA, invoices).
- Develop rule-based calculation engines, KPI computation, and recommendation algorithms.
- Build REST APIs with FastAPI, PostgreSQL, and modern web dashboards (React, Docker).
Required: Python, OCR / Tesseract, FastAPI, PostgreSQL, Docker, Document Processing.`
    }
  };

  function evaluateJobCompatibility(jobText) {
    const lower = jobText.toLowerCase();
    const words = lower.match(/[a-z0-9+#.-]+/g) || [];
    const wordSet = new Set(words);

    let totalScore = 0;
    let maxPossibleScore = 0;
    const categoryScores = {};
    const matchedSkills = new Set();
    const missingSkills = [];

    // Evaluate each category
    for (const [catName, catData] of Object.entries(SKILL_MAP)) {
      let hits = 0;
      const catKeywords = catData.keywords;

      catKeywords.forEach(kw => {
        // match exact phrase or word
        if (lower.includes(kw)) {
          hits++;
          matchedSkills.add(kw);
        }
      });

      // Score for category (diminishing returns)
      const ratio = Math.min(hits / Math.max(2, Math.min(catKeywords.length * 0.45, 5)), 1.0);
      const catScorePercent = Math.round(ratio * 100);
      categoryScores[catName] = {
        percent: catScorePercent,
        hits: hits,
        highlights: catData.moteeHighlights
      };

      totalScore += ratio * catData.weight;
      maxPossibleScore += catData.weight;
    }

    // Base score computation (scaled dynamically between 65% and 99%)
    let rawPercent = Math.min(Math.round((totalScore / maxPossibleScore) * 100), 100);
    // Baseline bonus for engineering fundamentals & AI profile alignment
    let finalScore = Math.max(Math.min(Math.round(rawPercent * 0.75 + (matchedSkills.size > 3 ? 24 : 15)), 99), 45);

    // Identify fit level and narrative summary
    let fitLevel = "Excellent Fit";
    let badgeClass = "fit-high";
    let summaryText = "";

    if (finalScore >= 85) {
      fitLevel = "🔥 Exceptional Match (90%+)";
      badgeClass = "fit-exceptional";
      summaryText = `Motee is directly qualified for this role! His end-to-end experience with <strong>FastAPI, LLaMA/Ollama, pgvector</strong>, and <strong>Tesseract OCR</strong> aligns seamlessly with your technical requirements. His research-driven mindset and production projects (Virtuo, CV-Job Matching) ensure immediate operational impact from day one.`;
    } else if (finalScore >= 70) {
      fitLevel = "✨ Strong Match (70%+)";
      badgeClass = "fit-strong";
      summaryText = `Very strong compatibility! Motee's core background in <strong>applied AI, Python, vector retrieval</strong> and <strong>data pipelines</strong> covers your key requirements, with rapid adaptability for any specialized libraries in your stack.`;
    } else {
      fitLevel = "💡 Good Potential Match";
      badgeClass = "fit-good";
      summaryText = `Good alignment on fundamental software engineering, machine learning pipelines, and Python backend architecture. Motee's fast learning curve and engineering rigor at EMSI make him a rapid learner for adjacent technologies.`;
    }

    return {
      score: finalScore,
      fitLevel: fitLevel,
      badgeClass: badgeClass,
      categoryScores: categoryScores,
      matchedSkills: Array.from(matchedSkills).slice(0, 14),
      summaryText: summaryText
    };
  }

  // ==========================================
  // 3. LIVE NLP & SENTIMENT / TOKEN ATTENTION ANALYZER
  // ==========================================
  const NLP_LEXICON = {
    // Positive tokens (EN & FR)
    positive: {
      "outstanding": 0.95, "exceptional": 0.95, "excellent": 0.9, "superbe": 0.9, "incredible": 0.9, "formidable": 0.9,
      "great": 0.75, "solid": 0.7, "accurate": 0.8, "précis": 0.8, "précision": 0.8, "efficient": 0.8, "efficace": 0.8,
      "fast": 0.7, "fluide": 0.75, "robust": 0.8, "robuste": 0.8, "innovative": 0.85, "innovant": 0.85,
      "love": 0.85, "impressive": 0.85, "clean": 0.7, "reliable": 0.75, "fiable": 0.8, "success": 0.8, "succès": 0.8,
      "optimal": 0.8, "perfect": 0.9, "parfait": 0.9, "valuable": 0.75, "utile": 0.7, "intelligente": 0.8, "intelligent": 0.8
    },
    // Negative tokens (EN & FR)
    negative: {
      "failed": -0.85, "failure": -0.9, "échec": -0.9, "disappointing": -0.85, "décevant": -0.85, "terrible": -0.9,
      "poor": -0.75, "mauvais": -0.75, "slow": -0.65, "lent": -0.65, "bug": -0.7, "error": -0.7, "erreur": -0.7,
      "broken": -0.8, "cassé": -0.8, "unreliable": -0.8, "instable": -0.75, "hard": -0.4, "difficile": -0.4,
      "latency": -0.3, "complex": -0.2, "limit": -0.35, "limite": -0.35, "heavy": -0.4, "lourd": -0.4
    },
    // Modifiers & Technical entities
    boosters: {
      "very": 1.4, "très": 1.4, "drastically": 1.5, "drastiquement": 1.5, "highly": 1.4, "extrêmement": 1.6, "extremely": 1.6,
      "fully": 1.3, "totalement": 1.3, "slightly": 0.5, "légèrement": 0.5, "not": -1.0, "pas": -1.0, "peu": 0.4
    },
    entities: {
      "ocr": "Tech / Document AI", "pdf": "Data / Format", "llm": "GenAI Model", "llama": "Open-Source LLM",
      "fastapi": "Backend Framework", "pgvector": "Vector Database", "postgres": "Database", "cerfa": "Tax Document",
      "pfe": "Engineering Internship", "pipeline": "Architecture", "model": "ML Architecture", "embeddings": "Vector Repr"
    }
  };

  function analyzeSentimentAndAttention(text) {
    if (!text || !text.trim()) {
      return null;
    }

    const rawTokens = text.match(/[A-Za-z0-9À-ÿ+#.-]+|[.,!?;]/g) || [];
    let cumulativePolarity = 0;
    let scoredTokenCount = 0;
    let multiplier = 1.0;

    const tokenAnalysis = [];
    const detectedEntities = [];

    for (let i = 0; i < rawTokens.length; i++) {
      const raw = rawTokens[i];
      const lower = raw.toLowerCase();

      // Check booster
      if (NLP_LEXICON.boosters[lower] !== undefined) {
        multiplier = NLP_LEXICON.boosters[lower];
        tokenAnalysis.push({ word: raw, score: 0, type: "booster", tag: `Modifier (x${multiplier})` });
        continue;
      }

      // Check entity
      if (NLP_LEXICON.entities[lower]) {
        detectedEntities.push({ entity: raw, type: NLP_LEXICON.entities[lower] });
      }

      let score = 0;
      let type = "neutral";

      if (NLP_LEXICON.positive[lower]) {
        score = NLP_LEXICON.positive[lower] * multiplier;
        type = "positive";
        scoredTokenCount++;
        multiplier = 1.0;
      } else if (NLP_LEXICON.negative[lower]) {
        score = NLP_LEXICON.negative[lower] * multiplier;
        type = "negative";
        scoredTokenCount++;
        multiplier = 1.0;
      }

      cumulativePolarity += score;
      tokenAnalysis.push({
        word: raw,
        score: parseFloat(score.toFixed(2)),
        type: type,
        isPunctuation: /^[.,!?;]$/.test(raw)
      });
    }

    // Polarity clamp between -1.0 and +1.0
    const finalPolarity = Math.max(-1.0, Math.min(1.0, scoredTokenCount > 0 ? (cumulativePolarity / (Math.sqrt(scoredTokenCount) || 1)) : 0));
    const subjectivity = Math.min(100, Math.round((scoredTokenCount / Math.max(rawTokens.length, 1)) * 300));

    let label = "NEUTRAL / BALANCED";
    let colorClass = "sentiment-neutral";
    let emotion = "Analytical & Objective";

    if (finalPolarity > 0.45) {
      label = "VERY POSITIVE / ENTHUSIASTIC";
      colorClass = "sentiment-very-positive";
      emotion = "High Enthusiasm & Satisfaction";
    } else if (finalPolarity > 0.15) {
      label = "POSITIVE / CONSTRUCTIVE";
      colorClass = "sentiment-positive";
      emotion = "Constructive & Favorable";
    } else if (finalPolarity < -0.35) {
      label = "NEGATIVE / CRITICAL";
      colorClass = "sentiment-negative";
      emotion = "Strong Critique / Dissatisfaction";
    } else if (finalPolarity < -0.1) {
      label = "SLIGHTLY CRITICAL / CAUTIONARY";
      colorClass = "sentiment-caution";
      emotion = "Constructive Caveat";
    }

    return {
      polarity: parseFloat(finalPolarity.toFixed(2)),
      subjectivity: subjectivity,
      label: label,
      colorClass: colorClass,
      emotion: emotion,
      tokenAnalysis: tokenAnalysis,
      entities: detectedEntities,
      wordCount: rawTokens.length
    };
  }



  // ==========================================
  // 5. INITIALIZE UI & EVENT LISTENERS
  // ==========================================
  function initAILab() {
    // A. Tabs switching
    const tabBtns = document.querySelectorAll('.lab-tab-btn');
    const tabPanels = document.querySelectorAll('.lab-panel');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });

    // B. Job Matcher UI
    const jobInput = document.getElementById('job-input');
    const runMatchBtn = document.getElementById('btn-run-match');
    const matchScoreEl = document.getElementById('match-score-value');
    const matchFitEl = document.getElementById('match-fit-level');
    const matchSummaryEl = document.getElementById('match-summary-text');
    const matchBarsEl = document.getElementById('match-bars-container');
    const matchedTagsEl = document.getElementById('matched-tags-container');
    const contactOfferBtn = document.getElementById('btn-contact-offer');
    const presetPills = document.querySelectorAll('.preset-pill');

    presetPills.forEach(pill => {
      pill.addEventListener('click', () => {
        presetPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const presetKey = pill.dataset.preset;
        if (JOB_PRESETS[presetKey] && jobInput) {
          jobInput.value = JOB_PRESETS[presetKey].text;
          runMatching();
        }
      });
    });

    function runMatching() {
      if (!jobInput) return;
      const text = jobInput.value.trim() || (JOB_PRESETS.research_llm ? JOB_PRESETS.research_llm.text : "");

      // Animate calculation state
      if (runMatchBtn) {
        runMatchBtn.classList.add('calculating');
        runMatchBtn.innerHTML = '<span>⚡ Inférence en cours...</span>';
      }

      setTimeout(() => {
        const res = evaluateJobCompatibility(text);

        if (matchScoreEl) {
          matchScoreEl.textContent = `${res.score}%`;
          matchScoreEl.className = `score-number ${res.badgeClass}`;
        }
        if (matchFitEl) {
          matchFitEl.textContent = res.fitLevel;
          matchFitEl.className = `fit-badge ${res.badgeClass}`;
        }
        if (matchSummaryEl) {
          matchSummaryEl.innerHTML = res.summaryText;
        }

        // Render category bars
        if (matchBarsEl) {
          let barsHtml = '';
          for (const [catName, catData] of Object.entries(res.categoryScores)) {
            barsHtml += `
              <div class="dim-row">
                <div class="dim-label">
                  <span>${catName}</span>
                  <strong>${catData.percent}%</strong>
                </div>
                <div class="dim-track">
                  <div class="dim-fill" style="width: ${catData.percent}%"></div>
                </div>
              </div>
            `;
          }
          matchBarsEl.innerHTML = barsHtml;
        }

        // Render matched skill tags
        if (matchedTagsEl) {
          if (res.matchedSkills.length > 0) {
            matchedTagsEl.innerHTML = res.matchedSkills
              .map(sk => `<span class="matched-tag">✓ ${sk.toUpperCase()}</span>`)
              .join(' ');
          } else {
            matchedTagsEl.innerHTML = `<span class="matched-tag neutral">Python / AI General</span>`;
          }
        }

        // Prefill contact email with matching details
        if (contactOfferBtn) {
          const subject = encodeURIComponent(`Opportunité PFE / Recrutement : Matching ${res.score}% pour Motee`);
          const body = encodeURIComponent(`Bonjour Motee,\n\nJ'ai testé votre simulateur de profil avec notre offre et nous avons obtenu une compatibilité de ${res.score}%.\n\nNous aimerions échanger avec vous concernant votre disponibilité pour un PFE en Février 2027.\n\nCordialement,`);
          contactOfferBtn.href = `mailto:motee.ibnmrabet1@gmail.com?subject=${subject}&body=${body}`;
        }

        if (runMatchBtn) {
          runMatchBtn.classList.remove('calculating');
          runMatchBtn.innerHTML = '<span>⚡ Réévaluer la compatibilité</span>';
        }
      }, 350);
    }

    if (runMatchBtn) {
      runMatchBtn.addEventListener('click', runMatching);
    }

    // Run initial match on page load
    if (jobInput && jobInput.value) {
      runMatching();
    }

    // C. Live NLP Analyzer UI
    const nlpInput = document.getElementById('nlp-input');
    const btnRunNlp = document.getElementById('btn-run-nlp');
    const nlpPresetBtns = document.querySelectorAll('.nlp-preset-btn');
    const nlpPolarityScore = document.getElementById('nlp-polarity-score');
    const nlpSentimentBadge = document.getElementById('nlp-sentiment-badge');
    const nlpSubjectivityScore = document.getElementById('nlp-subjectivity-score');
    const nlpTokensContainer = document.getElementById('nlp-tokens-container');
    const nlpEntitiesContainer = document.getElementById('nlp-entities-container');

    nlpPresetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (nlpInput) {
          nlpInput.value = btn.dataset.sample;
          runNLP();
        }
      });
    });

    function runNLP() {
      if (!nlpInput) return;
      const text = nlpInput.value.trim();
      const res = analyzeSentimentAndAttention(text);
      if (!res) return;

      if (nlpPolarityScore) {
        nlpPolarityScore.textContent = `${res.polarity > 0 ? '+' : ''}${res.polarity}`;
        nlpPolarityScore.className = `metric-val ${res.colorClass}`;
      }
      if (nlpSentimentBadge) {
        nlpSentimentBadge.textContent = res.label;
        nlpSentimentBadge.className = `sentiment-badge ${res.colorClass}`;
      }
      if (nlpSubjectivityScore) {
        nlpSubjectivityScore.textContent = `${res.subjectivity}%`;
      }

      // Render Token Attention Map
      if (nlpTokensContainer) {
        let tokensHtml = '';
        res.tokenAnalysis.forEach(tok => {
          let cls = 'tok-neutral';
          if (tok.type === 'positive') cls = 'tok-pos';
          else if (tok.type === 'negative') cls = 'tok-neg';
          else if (tok.type === 'booster') cls = 'tok-booster';

          const scoreLabel = tok.score !== 0 ? ` [${tok.score > 0 ? '+' : ''}${tok.score}]` : '';
          tokensHtml += `<span class="token-chip ${cls}" title="${tok.tag || ('Contribution: ' + tok.score)}">${tok.word}${scoreLabel}</span> `;
        });
        nlpTokensContainer.innerHTML = tokensHtml;
      }

      // Render Detected Entities
      if (nlpEntitiesContainer) {
        if (res.entities.length > 0) {
          nlpEntitiesContainer.innerHTML = res.entities
            .map(e => `<span class="entity-chip"><b>${e.entity}</b> (${e.type})</span>`)
            .join(' ');
        } else {
          nlpEntitiesContainer.innerHTML = `<span class="entity-chip muted">Aucune entité technique spécifique détectée</span>`;
        }
      }
    }

    if (btnRunNlp) {
      btnRunNlp.addEventListener('click', runNLP);
    }
    if (nlpInput && nlpInput.value) {
      runNLP();
    }
  }

  // ==========================================
  // 6. INITIALIZE FLOATING MIM-AI COPILOT (REAL LLM CLIENT)
  // ==========================================
  // Use the deployed API URL when configured, otherwise preserve local development behavior.
  const configuredApiBase = typeof window.MIM_API_BASE_URL === 'string'
    ? window.MIM_API_BASE_URL.trim().replace(/\/+$/, '')
    : '';
  const API_BASE = configuredApiBase || ((window.location.protocol === 'http:' && window.location.port === '8000')
    ? window.location.origin
    : 'http://localhost:8000');

  let conversationHistory = [];

  function initCopilotChat() {
    const trigger = document.getElementById('mim-ai-trigger');
    const drawer = document.getElementById('mim-ai-drawer');
    const closeBtn = document.getElementById('mim-chat-close');
    const clearBtn = document.getElementById('mim-chat-clear');
    const form = document.getElementById('mim-chat-form');
    const input = document.getElementById('mim-chat-input');
    const messagesBox = document.getElementById('mim-chat-messages');
    const chips = document.querySelectorAll('.chat-chip');
    const chatHeading = document.getElementById('chat-heading');

    if (!trigger || !drawer || !messagesBox) return;

    // Check backend health
    checkBackendHealth();

    function checkBackendHealth() {
      fetch(`${API_BASE}/api/health`)
        .then(res => res.json())
        .then(data => {
          const statusSpan = drawer.querySelector('.chat-title span');
          if (statusSpan) {
            statusSpan.textContent = `● LLM: ${data.model} (${data.active_provider.toUpperCase()})`;
            statusSpan.style.color = '#4ade80';
          }
        })
        .catch(() => {
          const statusSpan = drawer.querySelector('.chat-title span');
          if (statusSpan) {
            statusSpan.textContent = `● LOCAL (Connecter: uvicorn app:app)`;
            statusSpan.style.color = '#f59e0b';
          }
        });
    }

    function openChat() {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      trigger.classList.add('active');
      checkBackendHealth();
      if (input) input.focus();
    }

    function closeChat() {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      trigger.classList.remove('active');
    }

    trigger.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        closeChat();
      } else {
        openChat();
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeChat);

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        conversationHistory = [];
        messagesBox.innerHTML = `
          <div class="chat-msg bot">
            <div class="msg-avatar">MIM</div>
            <div class="msg-content">
              <strong>MIM-AI réinitialisé.</strong><br>
              Posez-moi n'importe quelle question sur le parcours, les compétences, le PFE 2027 ou les projets de Motee !
            </div>
          </div>
        `;
      });
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.dataset.query || chip.textContent;
        handleUserQuery(query);
      });
    });

    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = input.value.trim();
        if (q) {
          handleUserQuery(q);
          input.value = '';
        }
      });
    }

    async function handleUserQuery(queryText) {
      // 1. Add user message
      const userMsgDiv = document.createElement('div');
      userMsgDiv.className = 'chat-msg user';
      userMsgDiv.innerHTML = `<div class="msg-content">${escapeHTML(queryText)}</div>`;
      messagesBox.appendChild(userMsgDiv);
      messagesBox.scrollTop = messagesBox.scrollHeight;

      // 2. Add bot typing indicator
      const typingDiv = document.createElement('div');
      typingDiv.className = 'chat-msg bot typing';
      typingDiv.innerHTML = `
        <div class="msg-avatar">MIM</div>
        <div class="msg-content"><span class="typing-dots"><span></span><span></span><span></span></span></div>
      `;
      messagesBox.appendChild(typingDiv);
      messagesBox.scrollTop = messagesBox.scrollHeight;

      try {
        // 3. Real fetch call to FastAPI backend LLM endpoint
        const response = await fetch(`${API_BASE}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: queryText,
            history: conversationHistory
          })
        });

        if (typingDiv.parentNode) {
          typingDiv.parentNode.removeChild(typingDiv);
        }

        const data = await response.json();
        if (response.ok) {
          const rawReply = data.response;
          const formattedReply = renderMarkdown(rawReply);
          const latencyMeta = data.latency_ms ? `<div style="font: 9px var(--mono); color: #627d98; margin-top: 8px; border-top: 1px solid #1c364e; padding-top: 4px;">⚡ Inférence réelle : ${data.model} (${data.latency_ms} ms)</div>` : '';

          // Save to history
          conversationHistory.push({ role: 'user', content: queryText });
          conversationHistory.push({ role: 'assistant', content: rawReply });

          const botMsgDiv = document.createElement('div');
          botMsgDiv.className = 'chat-msg bot';
          botMsgDiv.innerHTML = `
            <div class="msg-avatar">MIM</div>
            <div class="msg-content">${formattedReply}${latencyMeta}</div>
          `;
          messagesBox.appendChild(botMsgDiv);
        } else {
          throw new Error(data.detail || `API returned status ${response.status}`);
        }
      } catch (err) {
        if (typingDiv.parentNode) {
          typingDiv.parentNode.removeChild(typingDiv);
        }

        const botMsgDiv = document.createElement('div');
        botMsgDiv.className = 'chat-msg bot';
        botMsgDiv.innerHTML = `
          <div class="msg-avatar">MIM</div>
          <div class="msg-content" style="border-color: #f59e0b; background: rgba(245, 158, 11, 0.08);">
            <strong style="color: #f59e0b;">⚠️ Échec de la requête à l’assistant IA</strong><br><br>
            ${escapeHTML(err.message || 'Erreur inconnue')}
          </div>
        `;
        messagesBox.appendChild(botMsgDiv);
      }

      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    function renderMarkdown(text) {
      if (!text) return '';
      let html = text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n\* (.*?)/g, '<br>• $1')
        .replace(/\n- (.*?)/g, '<br>• $1');
      return html;
    }

    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g,
        tag => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag)
      );
    }
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initCopilotChat();
    });
  } else {
    initCopilotChat();
  }
})();
