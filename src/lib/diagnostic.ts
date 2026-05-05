export type DimKey = "estrategia" | "gestao" | "engajamento" | "impacto" | "comunicacao";

export const DIMENSIONS: { key: DimKey; name: string; emoji: string; color: string }[] = [
  { key: "estrategia", name: "Estratégia & Governança", emoji: "🧭", color: "#03038c" },
  { key: "gestao", name: "Gestão & Operação", emoji: "⚙️", color: "#10593a" },
  { key: "engajamento", name: "Engajamento", emoji: "🤝", color: "#80deff" },
  { key: "impacto", name: "Impacto & Mensuração", emoji: "📊", color: "#d5f465" },
  { key: "comunicacao", name: "Comunicação & Cultura", emoji: "📣", color: "#ecbcfb" },
];

export type QType = "options" | "scale" | "text";
export interface Question {
  id: string;
  dim: DimKey;
  type: QType;
  title: string;
  hint?: string;
  options?: { label: string; sub?: string; badge?: string; value: number }[];
  scaleMin?: string;
  scaleMax?: string;
  optional?: boolean;
}

const opt = (label: string, sub: string, badge: string, value: number) => ({ label, sub, badge, value });

export const QUESTIONS: Question[] = [
  { id: "q1", dim: "estrategia", type: "options",
    title: "O voluntariado está formalmente inserido na estratégia ESG ou de RSE da empresa?",
    options: [
      opt("Não existe programa formal", "Ações pontuais e voluntárias, sem estrutura", "Inicial", 1),
      opt("Existe de forma informal", "Sem política, documentação ou responsável", "Em evolução", 2),
      opt("Documentado, mas não integrado à estratégia", "Política interna existe, mas isolada", "Estruturado", 3),
      opt("Faz parte da estratégia ESG com metas definidas", "KPIs, OKRs e orçamento estabelecidos", "Referência", 5),
    ]},
  { id: "q2", dim: "estrategia", type: "options",
    title: "Existe liderança dedicada (gestor, coordenador ou comitê) responsável pelo voluntariado?",
    options: [
      opt("Não há responsável formal", "Ninguém respondendo pela frente", "Inicial", 1),
      opt("Tarefa secundária de RH ou Comunicação", "Sem dedicação estruturada", "Em evolução", 2),
      opt("Há um responsável dedicado parcialmente", "Parte do tempo no programa", "Estruturado", 3),
      opt("Equipe ou comitê dedicado com orçamento próprio", "Estrutura formal e recursos", "Referência", 5),
    ]},
  { id: "q3", dim: "estrategia", type: "options",
    title: "Como o voluntariado está alinhado com os ODS?",
    hint: "Os Objetivos de Desenvolvimento Sustentável da ONU são um referencial importante para programas de impacto social corporativo.",
    options: [
      opt("Nenhum alinhamento mapeado", "ODS não considerados", "Inicial", 1),
      opt("Alinhamento informal", "Sem documentação", "Em evolução", 2),
      opt("ODS identificados, mas não reportados", "Mapeamento interno apenas", "Estruturado", 3),
      opt("ODS integrados ao relato e comunicação", "Reportados externamente", "Referência", 5),
    ]},
  { id: "q4", dim: "gestao", type: "options",
    title: "Como é feita a gestão das horas e atividades de voluntariado?",
    options: [
      opt("Não há controle sistemático", "Sem registro centralizado", "Inicial", 1),
      opt("Planilhas manuais", "Controles informais", "Em evolução", 2),
      opt("Plataforma digital com baixa adoção", "Tecnologia subutilizada", "Estruturado", 3),
      opt("Plataforma consolidada com dados confiáveis", "Adoção e qualidade", "Referência", 5),
    ]},
  { id: "q5", dim: "gestao", type: "options",
    title: "A empresa tem parcerias ativas com ONGs ou organizações da sociedade civil?",
    options: [
      opt("Nenhuma parceria formal", "Sem rede estabelecida", "Inicial", 1),
      opt("1 a 3 parceiros pontuais", "Sem contratos formais", "Em evolução", 2),
      opt("3 a 10 parceiros formalizados", "Acordos estruturados", "Estruturado", 3),
      opt("Mais de 10 parceiros com gestão ativa", "Carteira diversificada", "Referência", 5),
    ]},
  { id: "q6", dim: "gestao", type: "options",
    title: "Com que frequência ocorrem ações de voluntariado?",
    options: [
      opt("Raramente", "1 vez ao ano ou menos", "Inicial", 1),
      opt("Algumas vezes ao ano", "2 a 4 ações", "Em evolução", 2),
      opt("Mensalmente", "Agenda estruturada", "Estruturado", 3),
      opt("Continuamente", "Ações semana a semana", "Referência", 5),
    ]},
  { id: "q7", dim: "engajamento", type: "options",
    title: "Qual é a taxa aproximada de participação dos colaboradores em ações de voluntariado?",
    options: [
      opt("Menos de 5%", "Engajamento muito baixo", "Inicial", 1),
      opt("Entre 5% e 20%", "Engajamento parcial", "Em evolução", 2),
      opt("Entre 20% e 50%", "Engajamento relevante", "Estruturado", 3),
      opt("Mais de 50%", "Cultura difundida", "Referência", 5),
    ]},
  { id: "q8", dim: "engajamento", type: "options",
    title: "A empresa libera horas de trabalho remuneradas para o voluntariado?",
    options: [
      opt("Não — apenas fora do expediente", "Sem incentivo formal", "Inicial", 1),
      opt("Eventualmente, em casos pontuais", "Discricionário", "Em evolução", 2),
      opt("Sim, de forma limitada", "Ex.: 8h/ano por colaborador", "Estruturado", 3),
      opt("Política formal e banco de horas", "Estrutura consolidada", "Referência", 5),
    ]},
  { id: "q9", dim: "engajamento", type: "scale",
    title: "Como você avalia o entusiasmo dos colaboradores em participar do voluntariado?",
    scaleMin: "Muito baixo", scaleMax: "Muito alto" },
  { id: "q10", dim: "impacto", type: "options",
    title: "A empresa mensura o impacto social gerado pelas ações de voluntariado?",
    options: [
      opt("Não há mensuração", "Sem indicadores", "Inicial", 1),
      opt("Apenas outputs", "Horas e nº de participantes", "Em evolução", 2),
      opt("Outcomes para algumas ações", "Mensuração parcial", "Estruturado", 3),
      opt("SROI ou metodologia estruturada", "Impacto consolidado", "Referência", 5),
    ]},
  { id: "q11", dim: "impacto", type: "options",
    title: "Os resultados do programa são reportados à liderança sênior?",
    options: [
      opt("Não são reportados formalmente", "Sem visibilidade", "Inicial", 1),
      opt("Esporadicamente", "Sem periodicidade", "Em evolução", 2),
      opt("Anualmente, no relatório de sustentabilidade", "Cadência anual", "Estruturado", 3),
      opt("Trimestralmente, com dashboard para a diretoria", "Governança ativa", "Referência", 5),
    ]},
  { id: "q12", dim: "impacto", type: "scale",
    title: "Como você avalia a qualidade e confiabilidade dos dados do programa?",
    scaleMin: "Precários / inexistentes", scaleMax: "Excelentes / auditáveis" },
  { id: "q13", dim: "comunicacao", type: "options",
    title: "Como o voluntariado é comunicado internamente para os colaboradores?",
    options: [
      opt("Não há comunicação estruturada", "Sem plano", "Inicial", 1),
      opt("Comunicações pontuais por e-mail", "Sem cadência", "Em evolução", 2),
      opt("Campanhas periódicas com múltiplos canais", "Plano regular", "Estruturado", 3),
      opt("Estratégia contínua e integrada", "Sempre presente", "Referência", 5),
    ]},
  { id: "q14", dim: "comunicacao", type: "options",
    title: "O voluntariado é reconhecido e celebrado publicamente dentro da empresa?",
    options: [
      opt("Não há reconhecimento formal", "Sem celebração", "Inicial", 1),
      opt("Reconhecimento informal e esporádico", "Pontual", "Em evolução", 2),
      opt("Reconhecimento anual", "Premiação ou certificados", "Estruturado", 3),
      opt("Reconhecimento contínuo e cultura de celebração", "Ritual estabelecido", "Referência", 5),
    ]},
  { id: "q15", dim: "comunicacao", type: "text",
    title: "Qual é o maior desafio do seu programa de voluntariado hoje?",
    hint: "Ex.: Dificuldade em engajar colaboradores fora do eixo Sudeste…",
    optional: true },
];

export function calcScores(answers: Record<string, number | string>) {
  const dims: Record<DimKey, number[]> = { estrategia: [], gestao: [], engajamento: [], impacto: [], comunicacao: [] };
  QUESTIONS.forEach((q) => {
    const a = answers[q.id];
    if (q.type === "text" || a == null) return;
    let v = 0;
    if (q.type === "options" && q.options) v = q.options[a as number]?.value ?? 0;
    else if (q.type === "scale") v = a as number;
    if (v > 0) dims[q.dim].push(v);
  });
  const dimScores: Record<DimKey, number> = {} as any;
  (Object.keys(dims) as DimKey[]).forEach((k) => {
    const arr = dims[k];
    const avg = arr.length ? arr.reduce((s, n) => s + n, 0) / arr.length : 0;
    dimScores[k] = Math.round((avg / 5) * 100);
  });
  const total = Math.round(
    (dimScores.estrategia + dimScores.gestao + dimScores.engajamento + dimScores.impacto + dimScores.comunicacao) / 5
  );
  return { total, dims: dimScores };
}

export function getLevel(total: number) {
  if (total < 25) return { name: "Inicial", color: "#e23239", desc: "Programa em estágio inicial, com oportunidades amplas de estruturação." };
  if (total < 45) return { name: "Em Desenvolvimento", color: "#f97316", desc: "Bases sendo construídas — caminho para consolidação à frente." };
  if (total < 65) return { name: "Estruturado", color: "#eab308", desc: "Programa estabelecido, com espaço para ganhos de profundidade." };
  if (total < 85) return { name: "Avançado", color: "#10593a", desc: "Programa maduro, próximo a se tornar referência." };
  return { name: "Referência", color: "#03038c", desc: "Programa de referência no mercado brasileiro de voluntariado corporativo." };
}
