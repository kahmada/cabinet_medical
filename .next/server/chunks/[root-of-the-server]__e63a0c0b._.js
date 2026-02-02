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
;
// Prompt système personnalisé pour votre clinique
const SYSTEM_PROMPT = `Tu es l'assistant médical virtuel de la clinique MediCare, spécialisé dans l'analyse des symptômes et l'orientation des patients.

CONTEXTE DE LA CLINIQUE MEDICARE :
- Clinique moderne avec +24 spécialités médicales
- Services disponibles : consultations en cabinet, téléconsultations, urgences
- Prise de rendez-vous en ligne 24h/24
- Équipe de médecins expérimentés et spécialisés

TON RÔLE :
1. Accueillir chaleureusement les patients de MediCare
2. Analyser leurs symptômes avec précision
3. Poser des questions pertinentes (durée, intensité, symptômes associés, antécédents)
4. Évaluer le niveau d'urgence :
   - 🚨 URGENCE IMMÉDIATE (112) : douleur thoracique, difficulté respiratoire sévère, perte de connaissance, hémorragie importante, AVC
   - ⚠️ PRIORITAIRE (<48h) : fièvre élevée persistante, douleur intense, symptômes inquiétants
   - 📅 PROGRAMMÉE : symptômes gênants mais non urgents
   - 🏠 AUTO-SOINS : symptômes légers, conseils de prévention
5. Orienter vers la spécialité appropriée de MediCare :
   - Cardiologie, Dermatologie, Gastro-entérologie, Gynécologie
   - Neurologie, Ophtalmologie, ORL, Orthopédie
   - Pédiatrie, Pneumologie, Psychiatrie, Rhumatologie
   - Urologie, Médecine générale, etc.
6. Encourager la prise de rendez-vous en ligne sur notre plateforme

RÈGLES STRICTES :
- Toujours préciser que tu es un assistant IA et que ton avis ne remplace pas un diagnostic médical
- En cas de symptômes graves, orienter IMMÉDIATEMENT vers les urgences (112)
- Être empathique, rassurant et professionnel
- Poser des questions précises et médicalement pertinentes
- Répondre en français clair et accessible
- Mentionner les services de MediCare quand c'est pertinent
- Terminer par : "💡 Conseil : Prenez rendez-vous en ligne sur MediCare pour une consultation avec un de nos spécialistes."

Sois professionnel, empathique et utile. Tu représentes MediCare.`;
async function POST(req) {
    try {
        const body = await req.json();
        const messages = Array.isArray(body.messages) ? body.messages : [];
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            console.error("❌ GROQ_API_KEY manquante");
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                reply: "Désolé, le service de chatbot n'est pas configuré. Veuillez contacter l'administrateur."
            });
        }
        console.log("🔑 Utilisation de Groq (Llama 3) pour MediCare - GRATUIT");
        try {
            // Construire les messages pour Groq
            const groqMessages = [];
            // Ajouter le prompt système
            groqMessages.push({
                role: "system",
                content: SYSTEM_PROMPT
            });
            // Ajouter l'historique des messages (en ignorant le premier message d'accueil)
            let startIndex = 0;
            if (messages.length > 0 && messages[0].role === "assistant") {
                startIndex = 1; // Ignorer le message d'accueil initial
            }
            for(let i = startIndex; i < messages.length; i++){
                const msg = messages[i];
                if (msg.role === "user" || msg.role === "assistant") {
                    groqMessages.push({
                        role: msg.role,
                        content: msg.content
                    });
                }
            }
            if (groqMessages.length === 1) {
                // Seulement le système, pas de message utilisateur
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    reply: "Je n'ai pas reçu votre message. Pouvez-vous reformuler votre question ?"
                });
            }
            console.log(`📤 Envoi à Groq (${groqMessages.length - 1} messages)`);
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: groqMessages,
                    temperature: 0.8,
                    max_tokens: 800,
                    top_p: 0.95
                })
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                console.error("❌ Erreur Groq:", response.status, errorData);
                throw new Error(`Groq API error: ${response.status}`);
            }
            const data = await response.json();
            const reply = data.choices?.[0]?.message?.content?.trim();
            if (!reply) {
                throw new Error("Réponse vide de Groq");
            }
            console.log("✅ Réponse reçue de Groq (Llama 3)");
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                reply
            });
        } catch (groqError) {
            console.error("❌ Erreur Groq:", groqError);
            // Messages d'erreur plus spécifiques
            if (groqError.message?.includes("API key") || groqError.message?.includes("401")) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    reply: "Erreur de configuration de l'API. Veuillez contacter l'administrateur de MediCare."
                });
            }
            if (groqError.message?.includes("rate_limit") || groqError.message?.includes("429")) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    reply: "Le service est temporairement surchargé. Veuillez réessayer dans quelques instants."
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                reply: "Je rencontre un problème technique temporaire. En attendant, vous pouvez :\n\n• Prendre rendez-vous directement en ligne\n• Appeler notre standard\n• En cas d'urgence : composez le 112"
            });
        }
    } catch (e) {
        console.error("❌ Erreur serveur:", e);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            reply: "Erreur serveur. Veuillez réessayer ou contacter MediCare directement."
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e63a0c0b._.js.map