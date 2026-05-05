import { useEffect } from "react";
import { Logo, DownloadIcon } from "./Logo";
import { DIMENSIONS, getLevel, QUESTIONS } from "@/lib/diagnostic";
import type { LeadData } from "./Gate";
import { gerarPDF } from "@/lib/pdf";
import grafLupa from "@/assets/graf-lupa.png";
import grafPorta from "@/assets/graf-porta.png";
import grafBalao from "@/assets/graf-balao.png";

export interface ReportData {
  sumario: string;
  pontos_fortes: string[];
  gaps: string[];
  analise_dimensoes: Record<string, string>;
  recomendacoes: { titulo: string; descricao: string; prazo: string; impacto: string }[];
  mensagem_final: string;
}

export function Result({
  lead,
  scores,
  report,
  answers,
  onRestart,
}: {
  lead: LeadData;
  scores: { total: number; dims: Record<string, number> };
  report: ReportData;
  answers: Record<string, number | string>;
  onRestart: () => void;
}) {
  const level = getLevel(scores.total);
  const firstName = lead.nome.split(" ")[0];

  // Score circle anim
  const r = 80;
  const circ = 2 * Math.PI * r;
  const target = circ - (scores.total / 100) * circ;

  const prazoColor = (p: string) =>
    p.startsWith("Curto") ? "#e23239" : p.startsWith("Médio") ? "#eab308" : "#10593a";

  return (
    <div className="min-h-screen bg-offwhite">
      <header className="sticky top-0 z-30 backdrop-blur-md bg-offwhite/85 border-b border-[#e4e4f0]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo color="#03038c" size={24} />
          <button onClick={onRestart} className="text-sm text-navy font-medium hover:bg-white px-3 py-2 rounded-lg">
            ← Novo diagnóstico
          </button>
        </div>
      </header>

      <main className="max-w-[820px] mx-auto px-6 py-12 space-y-8">
        {/* Hero */}
        <div>
          <span className="inline-block bg-lime/40 text-forest font-semibold text-xs px-3 py-1.5 rounded-full mb-4">
            ✅ Diagnóstico concluído
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-navy mb-2">Pronto, {firstName}!</h1>
          <p className="text-muted-foreground mb-6">
            Aqui está o diagnóstico de maturidade do programa de voluntariado da{" "}
            <span className="font-semibold text-navy">{lead.empresa}</span>.
          </p>
          <button
            onClick={() => gerarPDF(lead, scores, level, report)}
            className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-5 py-3 rounded-xl hover:-translate-y-0.5 hover:shadow-soft transition"
          >
            <DownloadIcon /> Baixar PDF do Diagnóstico
          </button>
        </div>

        {/* Score card */}
        <div className="relative overflow-hidden bg-navy rounded-[20px] p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center radial-decor">
          <img src={grafLupa} alt="" aria-hidden className="pointer-events-none absolute -right-12 -bottom-10 w-[260px] opacity-25 select-none" />
          <div className="relative flex justify-center">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="14" />
              <circle
                cx="100" cy="100" r={r} fill="none" stroke="hsl(var(--lime))" strokeWidth="14" strokeLinecap="round"
                transform="rotate(-90 100 100)"
                style={{
                  strokeDasharray: circ,
                  ["--ring-circ" as any]: circ,
                  ["--ring-target" as any]: target,
                }}
                className="anim-ring"
              />
              <text x="100" y="105" textAnchor="middle" fill="white" fontSize="48" fontWeight="700" fontFamily="DM Serif Display">
                {scores.total}
              </text>
              <text x="100" y="130" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="14">
                / 100
              </text>
            </svg>
          </div>
          <div>
            <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-3" style={{ background: level.color, color: "#fff" }}>
              Nível: {level.name}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">{level.name}</h2>
            <p className="text-white/70">{level.desc}</p>
          </div>
        </div>

        {/* Dimensions */}
        <Card title="Scores por Dimensão">
          <div className="space-y-4">
            {DIMENSIONS.map((d) => {
              const sc = scores.dims[d.key];
              const color = sc >= 70 ? "#10593a" : sc >= 45 ? "#eab308" : "#e23239";
              return (
                <div key={d.key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-navy">
                      <span className="mr-2">{d.emoji}</span>{d.name}
                    </span>
                    <span className="text-sm font-semibold" style={{ color }}>{sc}/100</span>
                  </div>
                  <div className="h-2.5 bg-[#eef0f6] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full anim-bar"
                      style={{
                        background: "linear-gradient(90deg, #03038c, #80deff)",
                        ["--bar-w" as any]: `${sc}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Insights */}
        <div className="grid md:grid-cols-2 gap-5">
          <Card title="Pontos Fortes" accent="#10593a" icon="✅">
            <ul className="space-y-2.5">
              {report.pontos_fortes.map((p, i) => (
                <li key={i} className="flex gap-2 text-sm text-navy/85">
                  <span className="text-forest">●</span><span>{p}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Gaps Críticos" accent="#e23239" icon="⚠️">
            <ul className="space-y-2.5">
              {report.gaps.map((g, i) => (
                <li key={i} className="flex gap-2 text-sm text-navy/85">
                  <span style={{ color: "#e23239" }}>●</span><span>{g}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Análise por dimensão */}
        <Card title="Análise por Dimensão">
          <div className="space-y-4">
            {DIMENSIONS.map((d) => (
              <div key={d.key} className="rounded-xl overflow-hidden border border-[#eef0f6]">
                <div className="px-4 py-2.5 flex items-center justify-between text-white text-sm font-semibold" style={{ background: d.color }}>
                  <span>{d.emoji} {d.name}</span>
                  <span>{scores.dims[d.key]}/100</span>
                </div>
                <div className="p-4 bg-[#fafbfd] text-sm text-navy/85 leading-relaxed">
                  {report.analise_dimensoes[d.key] || "—"}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recomendações */}
        <Card title="Plano de Ação">
          <div className="space-y-3">
            {report.recomendacoes.map((rec, i) => {
              const c = prazoColor(rec.prazo);
              return (
                <div key={i} className="relative bg-[#fafbfd] rounded-xl p-4 pl-5 border border-[#eef0f6] overflow-hidden">
                  <span className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: c }} />
                  <div className="font-semibold text-navy mb-1">
                    <span className="text-muted-foreground mr-2">{i + 1}.</span>{rec.titulo}
                  </div>
                  <p className="text-sm text-navy/80 mb-3">{rec.descricao}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-full text-white font-medium" style={{ background: c }}>
                      {rec.prazo}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white border border-[#e4e4f0] text-navy">
                      Impacto: {rec.impacto}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* CTA */}
        <div className="relative overflow-hidden bg-navy rounded-[20px] p-8 border-2 border-lime text-center">
          <img src={grafPorta} alt="" aria-hidden className="pointer-events-none absolute -left-8 -bottom-10 w-[180px] opacity-30 select-none" />
          <img src={grafBalao} alt="" aria-hidden className="pointer-events-none absolute -right-8 -top-10 w-[200px] opacity-25 select-none" />
          <div className="relative">
          <h3 className="font-serif text-2xl text-white mb-2">Pronto para evoluir seu programa?</h3>
          <p className="text-white/85 mb-5">{report.mensagem_final}</p>
          <a
            href="https://freehelper.com.br"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-lime text-navy font-semibold px-6 py-3 rounded-xl hover:-translate-y-0.5 transition"
          >
            Falar com a Freehelper →
          </a>
          </div>
        </div>
      </main>
    </div>
  );
}

function Card({ title, children, accent, icon }: { title: string; children: React.ReactNode; accent?: string; icon?: string }) {
  return (
    <section className="bg-white rounded-2xl border border-[#eef0f6] shadow-soft p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="block w-1 h-6 rounded-full" style={{ background: accent || "#03038c" }} />
        <h3 className="font-serif text-xl text-navy">{icon ? `${icon} ` : ""}{title}</h3>
      </div>
      {children}
    </section>
  );
}
