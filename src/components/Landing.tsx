import { Logo, ClockIcon } from "./Logo";

export function Landing({ onStart }: { onStart: () => void }) {
  const features = [
    { icon: "📊", title: "Score geral + análise por dimensão", desc: "Radar visual com pontuação em 5 pilares" },
    { icon: "🔍", title: "Diagnóstico detalhado com gaps e forças", desc: "Identificação dos pontos críticos e diferenciais" },
    { icon: "🗺️", title: "Plano de ação com 3 horizontes", desc: "Recomendações para curto, médio e longo prazo" },
    { icon: "⚡", title: "Gerado por inteligência artificial", desc: "Análise consultiva com benchmarks do setor brasileiro" },
  ];

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left */}
      <div className="relative overflow-hidden bg-navy text-white p-8 md:p-14 flex flex-col radial-decor">
        <nav className="flex items-center justify-between">
          <Logo />
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-cyan text-cyan">
            Ferramenta Gratuita
          </span>
        </nav>

        <div className="flex-1 flex flex-col justify-center max-w-xl mt-10 md:mt-0">
          <div className="inline-flex items-center gap-2 text-cyan text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan anim-pulse-dot" />
            Diagnóstico de Maturidade
          </div>
          <h1 className="font-serif text-[2.4rem] md:text-[3.2rem] leading-[1.05] mb-6">
            Onde está o voluntariado da sua{" "}
            <em className="not-italic font-serif italic" style={{ color: "hsl(var(--lime))" }}>
              empresa
            </em>
            ?
          </h1>
          <p className="text-white/75 text-lg leading-relaxed mb-8">
            Em 8 minutos, descubra o nível de maturidade do seu programa de voluntariado corporativo
            e receba um relatório com gráficos, análise por dimensão e recomendações personalizadas.
          </p>
          <button
            onClick={onStart}
            className="group inline-flex items-center justify-center gap-3 bg-lime text-navy font-semibold text-lg px-7 py-5 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(213,244,101,0.35)] w-fit"
          >
            <ClockIcon />
            Faça o diagnóstico do voluntariado aqui!
          </button>
        </div>

        <div className="grid grid-cols-3 gap-0 mt-10 pt-8 border-t border-white/15">
          {[
            ["15", "Perguntas"],
            ["5", "Dimensões"],
            ["8min", "Para completar"],
          ].map(([n, l], i) => (
            <div key={i} className={`px-4 ${i > 0 ? "border-l border-white/15" : ""}`}>
              <div className="font-serif text-3xl text-cyan">{n}</div>
              <div className="text-white/60 text-sm mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="bg-offwhite p-8 md:p-14 flex flex-col justify-center hidden md:flex">
        <h2 className="font-serif text-3xl text-navy mb-8">O que você recebe no relatório</h2>
        <div className="space-y-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="group bg-white border border-[#e4e4f0] rounded-2xl p-5 flex gap-4 transition-all hover:translate-x-1 hover:border-navy hover:shadow-soft cursor-default"
            >
              <div className="text-2xl">{f.icon}</div>
              <div>
                <div className="font-semibold text-navy mb-1">{f.title}</div>
                <div className="text-sm text-muted-foreground">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-[#e4e4f0] text-xs text-muted-foreground">
          🔒 Seus dados são tratados conforme LGPD e usados apenas para gerar seu diagnóstico.
        </div>
      </div>
    </div>
  );
}
