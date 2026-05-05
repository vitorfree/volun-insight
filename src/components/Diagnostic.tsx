import { useEffect, useState } from "react";
import { QUESTIONS, DIMENSIONS } from "@/lib/diagnostic";
import { Logo } from "./Logo";

const badgeStyles: Record<string, string> = {
  Inicial: "bg-red-50 text-red-700 border-red-200",
  "Em evolução": "bg-amber-50 text-amber-700 border-amber-200",
  Estruturado: "bg-blue-50 text-blue-700 border-blue-200",
  Referência: "bg-lime-50 text-green-800 border-lime-300",
};

export function Diagnostic({
  answers,
  setAnswers,
  step,
  setStep,
  onComplete,
}: {
  answers: Record<string, number | string>;
  setAnswers: (a: Record<string, number | string>) => void;
  step: number;
  setStep: (n: number) => void;
  onComplete: () => void;
}) {
  const q = QUESTIONS[step];
  const dim = DIMENSIONS.find((d) => d.key === q.dim)!;
  const dimIndex = DIMENSIONS.findIndex((d) => d.key === q.dim) + 1;
  const progress = ((step + 1) / QUESTIONS.length) * 100;
  const answer = answers[q.id];
  const canNext = q.optional || (q.type === "text" ? true : answer != null);

  const setAns = (v: number | string) => setAnswers({ ...answers, [q.id]: v });

  const next = () => {
    if (step === QUESTIONS.length - 1) onComplete();
    else setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-offwhite">
      <header className="sticky top-0 z-30 backdrop-blur-md bg-offwhite/85 border-b border-[#e4e4f0]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Logo color="#03038c" size={24} />
          <div className="flex-1 mx-4">
            <div className="h-2 bg-[#e4e4f0] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #03038c, #80deff)",
                }}
              />
            </div>
            <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
              <span>Questão {step + 1} de {QUESTIONS.length}</span>
              <span>{dim.name}</span>
            </div>
          </div>
          <span className="hidden sm:inline text-xs px-3 py-1.5 rounded-full bg-navy text-white font-medium">
            Dimensão {dimIndex}
          </span>
        </div>
      </header>

      <main className="max-w-[700px] mx-auto px-6 py-12 md:py-16">
        <div key={q.id} className="anim-fadeup">
          <div className="text-xs uppercase tracking-[0.18em] font-semibold text-navy mb-3">
            {dim.name}
          </div>
          <h2 className="font-serif text-3xl md:text-[1.9rem] leading-tight text-navy mb-3">
            {q.title}
          </h2>
          {q.hint && <p className="text-sm text-muted-foreground mb-6">{q.hint}</p>}

          <div className="mt-6">
            {q.type === "options" && q.options && (
              <div className="grid gap-3">
                {q.options.map((o, i) => {
                  const selected = answer === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setAns(i)}
                      className={`text-left bg-white border-[1.5px] rounded-2xl p-4 md:p-5 transition-all flex gap-4 items-start ${
                        selected
                          ? "border-navy bg-[#e8e8f8] shadow-soft"
                          : "border-[#e4e4f0] hover:border-navy/40"
                      }`}
                    >
                      <span
                        className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selected ? "border-navy" : "border-[#c8c8d8]"
                        }`}
                      >
                        {selected && <span className="w-2.5 h-2.5 rounded-full bg-navy" />}
                      </span>
                      <span className="flex-1">
                        <span className="block font-semibold text-navy">{o.label}</span>
                        {o.sub && <span className="block text-sm text-muted-foreground mt-0.5">{o.sub}</span>}
                      </span>
                      {o.badge && (
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${badgeStyles[o.badge]}`}>
                          {o.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {q.type === "scale" && (
              <div className="bg-white border border-[#e4e4f0] rounded-2xl p-6">
                <div className="flex justify-between text-xs text-muted-foreground mb-4">
                  <span>{q.scaleMin}</span>
                  <span>{q.scaleMax}</span>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {[1, 2, 3, 4, 5].map((n) => {
                    const sel = answer === n;
                    return (
                      <button
                        key={n}
                        onClick={() => setAns(n)}
                        className={`aspect-square rounded-xl border-[1.5px] font-semibold text-lg transition-all ${
                          sel
                            ? "bg-navy text-white border-navy scale-[1.07] shadow-soft"
                            : "bg-white border-[#e4e4f0] text-navy hover:border-navy/40"
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {q.type === "text" && (
              <textarea
                value={(answer as string) || ""}
                onChange={(e) => setAns(e.target.value)}
                placeholder={q.hint}
                rows={5}
                className="w-full bg-white border-[1.5px] border-[#e4e4f0] rounded-2xl p-4 outline-none transition-colors focus:border-navy text-navy"
              />
            )}
          </div>

          <div className="flex items-center justify-between mt-10">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="px-4 py-2.5 text-navy font-medium hover:bg-white rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Voltar
            </button>
            <button
              onClick={next}
              disabled={!canNext}
              className="px-6 py-3 bg-navy text-white font-semibold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-soft"
            >
              {step === QUESTIONS.length - 1 ? "Finalizar →" : "Próxima →"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
