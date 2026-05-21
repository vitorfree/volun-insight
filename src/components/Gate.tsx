import { useState } from "react";
import { Logo, DownloadIcon } from "./Logo";
import { User, Mail, Building2, BadgeCheck, Users } from "lucide-react";
import grafMao from "@/assets/graf-mao.png";

export interface LeadData {
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  size: string;
}

const Field = ({ icon: Icon, ...props }: any) => (
  <div className="relative">
    <Icon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/50" strokeWidth={2} />
    <input
      {...props}
      className="w-full bg-white border-[1.5px] border-[#e4e4f0] rounded-xl pl-11 pr-3 py-3 outline-none transition-colors focus:border-navy text-navy placeholder:text-navy/40"
    />
  </div>
);

export function Gate({ onSubmit }: { onSubmit: (l: LeadData) => void }) {
  const [data, setData] = useState<LeadData>({ nome: "", email: "", empresa: "", cargo: "", size: "" });
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.nome.trim() || !data.empresa.trim()) return setError("Preencha nome e empresa.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return setError("E-mail inválido.");
    setError("");
    onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-navy radial-decor flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[960px] grid md:grid-cols-2 rounded-[24px] overflow-hidden shadow-strong">
        {/* Left */}
        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-[52px] hidden md:block overflow-hidden">
          <img src={grafMao} alt="" aria-hidden className="pointer-events-none absolute -right-10 -bottom-8 w-[240px] opacity-30 select-none" />
          <div className="relative">
            <div className="text-cyan text-sm font-medium mb-3">Quase lá!</div>
            <h2 className="font-serif text-4xl text-white mb-4">
              Seu diagnóstico está <em className="font-serif italic" style={{ color: "hsl(var(--lime))" }}>pronto</em>
            </h2>
            <p className="text-white/85 mb-8">
              Preencha os dados abaixo para acessar seu relatório personalizado.
            </p>
            <div className="space-y-5">
              {[
                ["📄", "Relatório PDF completo", "Análise consultiva detalhada"],
                ["🎯", "Plano de ação personalizado", "Curto, médio e longo prazo"],
                ["🤝", "Consultoria especializada", "Time freehelper à disposição"],
                ["🔒", "100% seguro e gratuito", "Dados protegidos pela LGPD"],
              ].map(([i, t, d], k) => (
                <div key={k} className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-cyan/15 border border-cyan/30 flex items-center justify-center text-lg shrink-0">
                    {i}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{t}</div>
                    <div className="text-white/75 text-sm">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="bg-offwhite p-8 md:p-[52px]">
          <Logo color="#03038c" size={24} />
          <h3 className="font-serif text-2xl text-navy mt-6 mb-1">Acesse seu relatório</h3>
          <p className="text-sm text-muted-foreground mb-6">Em instantes seu diagnóstico será gerado.</p>

          <form onSubmit={submit} className="space-y-3">
            <Field icon={User} placeholder="Nome completo *" value={data.nome} onChange={(e: any) => setData({ ...data, nome: e.target.value })} />
            <Field icon={Mail} type="email" placeholder="E-mail corporativo *" value={data.email} onChange={(e: any) => setData({ ...data, email: e.target.value })} />
            <Field icon={Building2} placeholder="Empresa *" value={data.empresa} onChange={(e: any) => setData({ ...data, empresa: e.target.value })} />
            <div className="border-t border-[#e4e4f0] my-4" />
            <Field icon={BadgeCheck} placeholder="Cargo / função (opcional)" value={data.cargo} onChange={(e: any) => setData({ ...data, cargo: e.target.value })} />
            <Field icon={Users} placeholder="Nº de colaboradores (opcional)" value={data.size} onChange={(e: any) => setData({ ...data, size: e.target.value })} />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-3 py-2.5">
                {error}
              </div>
            )}

            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Ao continuar, você concorda em receber comunicações da freehelper. Tratamos seus dados conforme a LGPD.
            </p>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-navy text-white font-semibold py-3.5 rounded-xl mt-2 transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              Gerar meu diagnóstico gratuito <DownloadIcon />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
