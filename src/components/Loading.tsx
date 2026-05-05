import { Logo } from "./Logo";

export function Loading() {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center text-center px-6">
      <Logo color="#ffffff" />
      <h2 className="font-serif text-3xl md:text-4xl text-white mt-10 mb-6">
        Analisando o perfil da sua empresa…
      </h2>
      <div className="flex gap-2 mb-6">
        {[0, 0.2, 0.4].map((d, i) => (
          <span
            key={i}
            className="w-3 h-3 rounded-full bg-cyan anim-bounce-dot"
            style={{ animationDelay: `${d}s` }}
          />
        ))}
      </div>
      <p className="text-white/60">Gerando diagnóstico personalizado com IA</p>
    </div>
  );
}
