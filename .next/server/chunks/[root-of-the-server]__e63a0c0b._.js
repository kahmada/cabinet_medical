module.exports = [
"[project]/.next-internal/server/app/api/chat/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
;
;
const SYSTEM_PROMPT = `Tu es un assistant médical virtuel spécialisé. Tu as deux modes :
1. Mode Assistant RDV : Tu aides à prendre rendez-vous en posant des questions sur les symptômes pour orienter vers le bon médecin
2. Mode Détection : Tu analyses les symptômes décrits pour suggérer le niveau d'urgence et le type de consultation nécessaire

Règles strictes :
- Toujours préciser que tu n'es pas un médecin
- En cas de symptômes graves, orienter immédiatement vers urgences (112 en France)
- Poser des questions précises et médicalement pertinentes
- Fournir des réponses en français clair et rassurant`;
const detectionIntro = `Mode actuel: Détection des symptômes. Objectif: triage (urgence immédiate, prioritaire <48h, programmée, auto-soins).
Pose 2-3 questions de précision si nécessaire. Donne une recommandation claire de triage.
Ajoute un rappel: "Je ne remplace pas un avis médical. En cas de détresse vitale, appelez le 112."`;
function ruleBasedFallback(mode, messages) {
    const lastUser = [
        ...messages
    ].reverse().find((m)=>m.role === "user")?.content.toLowerCase() || "";
    const severe = [
        "douleur thoracique",
        "douleur au thorax",
        "difficulté à respirer",
        "essoufflement",
        "perte de connaissance",
        "paralysie",
        "paralysé",
        "troubles de la parole",
        "faible conscience",
        "saignement abondant",
        "hemorragie",
        "crise",
        "convulsion"
    ];
    const isSevere = severe.some((k)=>lastUser.includes(k));
    if (mode === "detection") {
        if (isSevere) {
            return `Vos symptômes peuvent évoquer une urgence. Je vous recommande d'appeler immédiatement le 112 ou de vous rendre aux urgences. Je ne remplace pas un avis médical.`;
        }
        // Simple triage
        const keywordsUrgent = [
            "douleur intense",
            "fièvre élevée",
            "respiration",
            "saignement",
            "déshydratation",
            "fracture"
        ];
        const keywordsPrioritaire = [
            "fièvre",
            "éruption",
            "douleur",
            "infection",
            "plaie",
            "otite",
            "toux persistante"
        ];
        const urgent = keywordsUrgent.some((k)=>lastUser.includes(k));
        const prioritaire = keywordsPrioritaire.some((k)=>lastUser.includes(k));
        if (urgent) {
            return `Recommandation: consultation urgente (aujourd'hui). Si aggravation ou signe de détresse (douleur thoracique, détresse respiratoire, déficit neurologique), appelez le 112. Je ne remplace pas un avis médical.`;
        }
        if (prioritaire) {
            return `Recommandation: consultation prioritaire sous 24-48h. Pouvez-vous préciser la durée des symptômes, leur intensité et vos antécédents ? Je ne remplace pas un avis médical.`;
        }
        return `Recommandation: consultation programmée ou auto-soins selon l'évolution. Pouvez-vous préciser la durée, l'intensité et d'autres symptômes associés ? Je ne remplace pas un avis médical.`;
    }
    // RDV mode specialty suggestions
    const mapping = [
        {
            key: "coeur",
            spec: "Cardiologie"
        },
        {
            key: "thorax",
            spec: "Cardiologie"
        },
        {
            key: "peau",
            spec: "Dermatologie"
        },
        {
            key: "bouton",
            spec: "Dermatologie"
        },
        {
            key: "enfant",
            spec: "Pédiatrie"
        },
        {
            key: "fièvre",
            spec: "Médecine générale"
        },
        {
            key: "rhume",
            spec: "Médecine générale"
        },
        {
            key: "toux",
            spec: "Médecine générale"
        }
    ];
    const found = mapping.find((m)=>lastUser.includes(m.key))?.spec || "Médecine générale";
    return `Merci pour ces informations. Je vous orienterais vers: ${found}. Depuis quand les symptômes ont-ils commencé ? Avez-vous des antécédents ? Préférez-vous un créneau le matin ou l'après-midi ? Souhaitez-vous réserver un créneau maintenant ? Je ne remplace pas un avis médical.`;
}
async function POST(req) {
    try {
        const body = await req.json();
        const mode = body.mode === "detection" ? "detection" : "rdv";
        const messages = Array.isArray(body.messages) ? body.messages : [];
        const apiKey = process.env.OPENAI_API_KEY;
        // RDV assistant is always rule-based as per request
        if (mode === "rdv") {
            const reply = ruleBasedFallback(mode, messages);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                reply
            });
        }
        // Symptom detection uses OpenRouter if key exists, otherwise fallback
        if (mode === "detection" && apiKey) {
            console.log("🔑 Utilisation d'OpenRouter avec clé:", apiKey.substring(0, 15) + "...");
            // Vérifier si c'est une clé OpenRouter ou OpenAI
            const isOpenRouter = apiKey.startsWith('sk-or-v1-');
            const client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
                apiKey,
                ...isOpenRouter ? {
                    baseURL: "https://openrouter.ai/api/v1",
                    defaultHeaders: {
                        "HTTP-Referer": "http://localhost:3000",
                        "X-Title": "Cabinet Médical - Assistant IA"
                    }
                } : {}
            });
            const system = [
                SYSTEM_PROMPT,
                detectionIntro
            ].join("\n\n");
            const chatMessages = [
                {
                    role: "system",
                    content: system
                },
                ...messages.map((m)=>({
                        role: m.role,
                        content: m.content
                    }))
            ];
            console.log("📤 Envoi de la requête à OpenRouter...");
            try {
                const completion = await client.chat.completions.create({
                    model: isOpenRouter ? "mistralai/mistral-7b-instruct:free" : "gpt-4o-mini",
                    messages: chatMessages,
                    temperature: 0.3,
                    max_tokens: 500
                });
                console.log("✅ Réponse reçue d'OpenRouter");
                const reply = completion.choices[0]?.message?.content?.trim() || ruleBasedFallback(mode, messages);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    reply
                });
            } catch (openRouterError) {
                console.error("❌ Erreur OpenRouter:", openRouterError);
                if (openRouterError && typeof openRouterError === 'object' && 'response' in openRouterError) {
                    const error = openRouterError;
                    console.error("Status:", error.response?.status);
                    console.error("Data:", error.response?.data);
                }
                // Fallback en cas d'erreur
                console.log("🔄 Utilisation du fallback...");
                const reply = ruleBasedFallback(mode, messages);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    reply
                });
            }
        }
        // Fallback when no API key is present
        const reply = ruleBasedFallback(mode, messages);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            reply
        });
    } catch (e) {
        console.error(e);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Erreur serveur"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e63a0c0b._.js.map