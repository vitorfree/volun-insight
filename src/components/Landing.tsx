import { Logo, ClockIcon } from "./Logo";
import { Globe, Instagram, Linkedin } from "lucide-react";
import grafLupa from "@/assets/graf-lupa.png";
import grafPorta from "@/assets/graf-porta.png";
import grafLapis from "@/assets/graf-lapis.png";
import grafBalao from "@/assets/graf-balao.png";
import grafMao from "@/assets/graf-mao.png";

export function Landing({ onStart }: { onStart: () => void }) {
  const features = [
    { img: grafLupa, title: "Score geral + análise por dimensão", desc: "Radar visual com pontuação em 5 pilares" },
    { img: grafLapis, title: "Diagnóstico detalhado com gaps e forças", desc: "Identificação dos pontos críticos e diferenciais" },
    { img: grafPorta, title: "Plano de ação com 3 horizontes", desc: "Recomendações para curto, médio e longo prazo" },
  ];

  return (
    <div className="min-h-screen bg-offwhite text-navy relative overflow-hidden">
      {/* Decorative graphics */}
      <img
        src={grafLupa}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-16 w-[360px] opacity-30 select-none"
      />
      <img
        src={grafPorta}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-10 -bottom-12 w-[200px] opacity-25 select-none"
      />

      <img
        src={grafPorta}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-10 -bottom-12 w-[200px] opacity-25 select-none"
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-12 flex flex-col min-h-screen">
        <nav className="flex items-center justify-between">
          <Logo size={28} color="#03038c" />
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-navy/30 text-navy bg-white/70">
            Ferramenta Gratuita
          </span>
        </nav>

        <div className="flex-1 flex flex-col items-center text-center justify-center max-w-3xl mx-auto py-16">
          <div className="inline-flex items-center gap-2 text-navy text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-navy anim-pulse-dot" />
            Diagnóstico de Maturidade
          </div>
          <h1 className="font-serif text-[2.4rem] md:text-[3.6rem] leading-[1.05] mb-6 text-navy">
            Onde está o voluntariado da sua{" "}
            <em className="not-italic font-serif italic text-forest">empresa</em>?
          </h1>
          <p className="text-navy/80 text-lg leading-relaxed mb-8 max-w-2xl">
            Em 5 minutos, descubra o nível de maturidade do seu programa de voluntariado corporativo
            e receba um relatório com gráficos, análise por dimensão e recomendações personalizadas.
          </p>
          <button
            onClick={onStart}
            className="group inline-flex items-center justify-center gap-3 bg-navy text-white font-semibold text-lg px-7 py-5 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(3,3,140,0.35)]"
          >
            <ClockIcon />
            Faça o diagnóstico do voluntariado aqui!
          </button>

          <div className="grid grid-cols-3 gap-0 mt-12 pt-8 border-t border-navy/15 w-full max-w-xl">
            {[
              ["10", "Perguntas"],
              ["5", "Dimensões"],
              ["5min", "Para completar"],
            ].map(([n, l], i) => (
              <div key={i} className={`px-4 ${i > 0 ? "border-l border-navy/15" : ""}`}>
                <div className="font-serif text-3xl text-forest">{n}</div>
                <div className="text-forest/70 text-sm mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <section className="pb-10">
          <h2 className="font-serif text-2xl md:text-3xl text-navy mb-6 text-center">
            O que você recebe no relatório
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className={`bg-white border border-navy/10 rounded-2xl p-5 flex gap-4 items-center transition-all hover:-translate-y-0.5 hover:border-navy hover:shadow-soft cursor-default ${
                  i === 2 ? "sm:col-span-2 sm:max-w-md sm:mx-auto sm:w-full" : ""
                }`}
              >
                <img src={f.img} alt="" aria-hidden className="w-12 h-12 object-contain shrink-0" />
                <div>
                  <div className="font-semibold text-navy mb-1">{f.title}</div>
                  <div className="text-sm text-navy/80">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-xs text-navy/70 text-center">
            🔒 Seus dados são tratados conforme LGPD e usados apenas para gerar seu diagnóstico.
          </div>
        </section>

        <footer className="py-8 border-t border-navy/15">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Logo size={24} color="#03038c" />
            <div className="flex items-center gap-6">
              <a
                href="https://freehelper.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-navy/70 hover:text-navy transition-colors text-sm"
              >
                <Globe size={16} strokeWidth={2} />
                freehelper.com.br
              </a>
              <a
                href="https://instagram.com/freehelper"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-navy/70 hover:text-navy transition-colors text-sm"
              >
                <Instagram size={16} strokeWidth={2} />
                @freehelper
              </a>
              <a
                href="https://linkedin.com/company/freehelper"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-navy/70 hover:text-navy transition-colors text-sm"
              >
                <Linkedin size={16} strokeWidth={2} />
                Freehelper
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
