import { useState } from "react";
import { Landing } from "@/components/Landing";
import { Diagnostic } from "@/components/Diagnostic";
import { Gate, type LeadData } from "@/components/Gate";
import { Loading } from "@/components/Loading";
import { Result, type ReportData } from "@/components/Result";
import { calcScores, getLevel, QUESTIONS } from "@/lib/diagnostic";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Page = "landing" | "diagnostic" | "gate" | "loading" | "result";

const fallbackReport = (scores: any, level: any, lead: LeadData): ReportData => ({
  sumario: `O programa de voluntariado da ${lead.empresa} encontra-se em nível ${level.name.toLowerCase()}, com score geral de ${scores.total}/100. Há oportunidades concretas de evolução para tornar o programa mais estratégico, mensurável e engajador.`,
  pontos_fortes: ["Disposição da empresa em diagnosticar o programa", "Existência de iniciativas em andamento", "Reconhecimento da importância do tema", "Abertura para evoluir a maturidade"],
  gaps: ["Estruturação estratégica e governança a fortalecer", "Mensuração de impacto a aprofundar", "Engajamento de colaboradores a expandir", "Comunicação interna a sistematizar"],
  analise_dimensoes: {
    estrategia: "A estratégia merece formalização e integração à agenda ESG da empresa.",
    gestao: "A operação ganhará robustez com plataforma de gestão e parcerias formalizadas.",
    engajamento: "Há espaço para ampliar a participação dos colaboradores via incentivos formais.",
    impacto: "A mensuração de outcomes e SROI são próximos passos relevantes.",
    comunicacao: "Comunicação contínua e cultura de reconhecimento fortalecerão o programa.",
  },
  recomendacoes: [
    { titulo: "Formalizar política de voluntariado", descricao: "Documente objetivos, governança e horas dedicadas.", prazo: "Curto prazo (0-3 meses)", impacto: "Alto" },
    { titulo: "Definir comitê responsável", descricao: "Estabeleça liderança dedicada e ritos de acompanhamento.", prazo: "Curto prazo (0-3 meses)", impacto: "Médio" },
    { titulo: "Implementar plataforma de gestão", descricao: "Centralize horas, ações e indicadores em sistema único.", prazo: "Médio prazo (3-6 meses)", impacto: "Alto" },
    { titulo: "Estruturar parcerias com ONGs", descricao: "Formalize acordos com organizações alinhadas aos ODS.", prazo: "Médio prazo (3-6 meses)", impacto: "Médio" },
    { titulo: "Estabelecer mensuração de impacto", descricao: "Adote metodologia de SROI e reporte trimestral à liderança.", prazo: "Longo prazo (6-12 meses)", impacto: "Alto" },
  ],
  mensagem_final: `${lead.nome.split(" ")[0]}, a ${lead.empresa} tem grande potencial para transformar seu programa de voluntariado em referência. Com os passos certos, é possível evoluir significativamente nos próximos 12 meses.`,
});

const Index = () => {
  const [page, setPage] = useState<Page>("landing");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [lead, setLead] = useState<LeadData | null>(null);
  const [scores, setScores] = useState<any>(null);
  const [report, setReport] = useState<ReportData | null>(null);

  const handleGate = async (l: LeadData) => {
    setLead(l);
    const sc = calcScores(answers);
    setScores(sc);
    const level = getLevel(sc.total);
    setPage("loading");

    const answersText = QUESTIONS.map((q) => {
      const a = answers[q.id];
      let resp = "—";
      if (q.type === "options" && a != null) resp = q.options![a as number].label;
      else if (q.type === "scale" && a != null) resp = `${a}/5`;
      else if (q.type === "text" && a) resp = String(a);
      return `${q.title}\n  → ${resp}`;
    }).join("\n");

    try {
      const { data, error } = await supabase.functions.invoke("generate-diagnostic", {
        body: { lead: l, scores: sc, level, answersText },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setReport((data as any).report);
    } catch (e: any) {
      console.error(e);
      toast.error("Não foi possível gerar a análise por IA. Exibindo análise padrão.");
      setReport(fallbackReport(sc, level, l));
    }
    setPage("result");
  };

  const restart = () => {
    setPage("landing"); setStep(0); setAnswers({}); setLead(null); setScores(null); setReport(null);
  };

  if (page === "landing") return <Landing onStart={() => setPage("diagnostic")} />;
  if (page === "diagnostic")
    return (
      <Diagnostic
        answers={answers}
        setAnswers={setAnswers}
        step={step}
        setStep={setStep}
        onComplete={() => setPage("gate")}
      />
    );
  if (page === "gate") return <Gate onSubmit={handleGate} />;
  if (page === "loading") return <Loading />;
  if (page === "result" && lead && scores && report)
    return <Result lead={lead} scores={scores} report={report} answers={answers} onRestart={restart} />;
  return null;
};

export default Index;
