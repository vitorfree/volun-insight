import { Logo } from "./Logo";
import grafLapis from "@/assets/graf-lapis.png";
import grafBalao from "@/assets/graf-balao.png";

export function Loading() {
  return (
    <div className="relative min-h-screen bg-navy flex flex-col items-center justify-center text-center px-6 overflow-hidden radial-decor">
      <img src={grafLapis} alt="" aria-hidden className="pointer-events-none absolute -left-16 top-10 w-[260px] opacity-30 select-none" />
      <img src={grafBalao} alt="" aria-hidden className="pointer-events-none absolute -right-16 bottom-10 w-[280px] opacity-25 select-none" />
      <div className="relative">
        <Logo size={36} />
      </div>
      <h2 className="relative font-serif text-3xl md:text-4xl text-white mt-10 mb-6">
        Analisando o perfil da sua empresa…
      </h2>
      <div className="relative flex gap-2 mb-6">
        {[0, 0.2, 0.4].map((d, i) => (
          <span
            key={i}
            className="w-3 h-3 rounded-full bg-cyan anim-bounce-dot"
            style={{ animationDelay: `${d}s` }}
          />
        ))}
      </div>
      <p className="relative text-white/85">Gerando diagnóstico personalizado com IA</p>
    </div>
  );
}
