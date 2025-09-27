"use client";
import { useEffect, useRef, useState } from "react";

type Role = "user" | "assistant" | "system";
type ChatMessage = { role: Role; content: string };

export default function ChatbotPage() {
  const [mode, setMode] = useState<"rdv" | "detection">("rdv");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Bonjour, je suis votre assistant médical virtuel. Comment puis-je vous aider aujourd'hui ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const content = input.trim();
    if (!content) return;
    setInput("");
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, messages: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Erreur serveur");
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Désolé, une erreur est survenue. Réessayez plus tard." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Assistant Médical IA</h1>
      <p className="mt-2 text-slate-600 max-w-prose">
        Deux modes:
        <br />
        1) Assistant RDV: oriente vers la bonne spécialité et aide à choisir un créneau.
        <br />
        2) Détection Symptômes: propose un triage (urgence, prioritaire, auto-soins).
      </p>
      <div className="mt-3 text-xs text-slate-600">
        Important: cet assistant ne remplace pas un avis médical. En cas de symptômes graves, appelez le 112.
      </div>

      <div className="mt-6">
        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
          <button
            onClick={() => setMode("rdv")}
            className={`px-3 py-1 text-sm rounded-md ${mode === "rdv" ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-50"}`}
          >
            Assistant RDV
          </button>
          <button
            onClick={() => setMode("detection")}
            className={`px-3 py-1 text-sm rounded-md ${mode === "detection" ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-50"}`}
          >
            Détection Symptômes
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <div className="h-[420px] overflow-y-auto rounded-lg border border-slate-200 bg-white p-4">
          {messages.map((m, i) => (
            <div key={i} className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}>
              <div className={`inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm ${m.role === "user" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-800"}`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-left">
              <div className="inline-block rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">…</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "rdv" ? "Décrivez brièvement votre besoin pour un RDV…" : "Décrivez vos symptômes…"}
            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <button
            onClick={send}
            disabled={loading}
            className="inline-flex items-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-blue-700 disabled:opacity-60"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
