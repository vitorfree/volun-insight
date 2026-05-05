import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { lead, scores, level, answersText } = await req.json();
    const KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!KEY) throw new Error("LOVABLE_API_KEY missing");

    const prompt = `Você é um consultor sênior da Freehelper, empresa especialista em voluntariado corporativo e impacto social no Brasil.

DADOS DO DIAGNÓSTICO:
- Empresa: ${lead.empresa}
- Responsável: ${lead.nome} | Cargo: ${lead.cargo || "—"} | Porte: ${lead.size || "—"} colaboradores
- Score geral: ${scores.total}/100 — Nível: ${level.name}
- Estratégia & Governança: ${scores.dims.estrategia}/100
- Gestão & Operação: ${scores.dims.gestao}/100
- Engajamento: ${scores.dims.engajamento}/100
- Impacto & Mensuração: ${scores.dims.impacto}/100
- Comunicação & Cultura: ${scores.dims.comunicacao}/100

RESPOSTAS COMPLETAS:
${answersText}

INSTRUÇÕES: Gere um diagnóstico consultivo DETALHADO em português brasileiro. Responda APENAS com JSON válido sem markdown:

{
  "sumario": "Parágrafo de 5-6 frases contextualizando a empresa no cenário brasileiro de voluntariado corporativo, o nível de maturidade encontrado e a perspectiva de evolução.",
  "pontos_fortes": ["forte 1", "forte 2", "forte 3", "forte 4"],
  "gaps": ["gap 1", "gap 2", "gap 3", "gap 4"],
  "analise_dimensoes": {
    "estrategia": "2-3 frases.",
    "gestao": "2-3 frases.",
    "engajamento": "2-3 frases.",
    "impacto": "2-3 frases.",
    "comunicacao": "2-3 frases."
  },
  "recomendacoes": [
    {"titulo":"...","descricao":"...","prazo":"Curto prazo (0-3 meses)","impacto":"Alto"},
    {"titulo":"...","descricao":"...","prazo":"Curto prazo (0-3 meses)","impacto":"Médio"},
    {"titulo":"...","descricao":"...","prazo":"Médio prazo (3-6 meses)","impacto":"Alto"},
    {"titulo":"...","descricao":"...","prazo":"Médio prazo (3-6 meses)","impacto":"Médio"},
    {"titulo":"...","descricao":"...","prazo":"Longo prazo (6-12 meses)","impacto":"Alto"}
  ],
  "mensagem_final": "Mensagem motivacional personalizada de 3-4 frases."
}`;

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: "Você é consultor sênior de voluntariado corporativo. Responde sempre apenas JSON válido." },
          { role: "user", content: prompt },
        ],
      }),
    });
    if (!r.ok) {
      const t = await r.text();
      console.error("AI error", r.status, t);
      if (r.status === 429) return new Response(JSON.stringify({ error: "Limite de requisições. Tente em instantes." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (r.status === 402) return new Response(JSON.stringify({ error: "Créditos esgotados." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error("AI gateway error");
    }
    const data = await r.json();
    const content = data.choices?.[0]?.message?.content || "";
    const m = content.match(/\{[\s\S]*\}/);
    if (!m) throw new Error("No JSON in response");
    const report = JSON.parse(m[0]);
    return new Response(JSON.stringify({ report }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "erro" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
