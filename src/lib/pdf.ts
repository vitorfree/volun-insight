import jsPDF from "jspdf";
import type { LeadData } from "@/components/Gate";
import type { ReportData } from "@/components/Result";
import { DIMENSIONS } from "./diagnostic";
import grafLupa from "@/assets/graf-lupa.png";
import grafPorta from "@/assets/graf-porta.png";
import grafLapis from "@/assets/graf-lapis.png";
import grafBalao from "@/assets/graf-balao.png";
import grafMao from "@/assets/graf-mao.png";
import letteringBranco from "@/assets/freehelper-branco.png";
import letteringAzul from "@/assets/freehelper-azul.png";

async function toDataURL(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return await new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}

const NAVY: [number, number, number] = [3, 3, 140];
const CYAN: [number, number, number] = [128, 222, 255];
const LIME: [number, number, number] = [213, 244, 101];
const FOREST: [number, number, number] = [16, 89, 58];
const RED: [number, number, number] = [226, 50, 57];
const OFF: [number, number, number] = [247, 249, 237];

export async function gerarPDF(
  lead: LeadData,
  scores: { total: number; dims: Record<string, number> },
  level: { name: string; color: string; desc: string },
  report: ReportData
) {
  try {
    const [imgLupa, imgPorta, imgLapis, imgBalao, imgMao, logoBranco, logoAzul] = await Promise.all([
      toDataURL(grafLupa),
      toDataURL(grafPorta),
      toDataURL(grafLapis),
      toDataURL(grafBalao),
      toDataURL(grafMao),
      toDataURL(letteringBranco),
      toDataURL(letteringAzul),
    ]);
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210, H = 297, M = 20;

    const setFill = (c: [number, number, number]) => doc.setFillColor(c[0], c[1], c[2]);
    const setText = (c: [number, number, number]) => doc.setTextColor(c[0], c[1], c[2]);
    const setDraw = (c: [number, number, number]) => doc.setDrawColor(c[0], c[1], c[2]);

    const rodape = (n: number) => {
      setFill(OFF); doc.rect(0, H - 14, W, 14, "F");
      setDraw([220, 220, 230]); doc.setLineWidth(0.2); doc.line(M, H - 14, W - M, H - 14);
      setText([110, 110, 130]); doc.setFont("helvetica", "normal"); doc.setFontSize(8);
      doc.text("freehelper.com.br · Diagnóstico de Maturidade · Confidencial", M, H - 6);
      doc.text(`${n} / 6`, W - M, H - 6, { align: "right" });
    };

    // ========== PAGE 1 — Cover ==========
    setFill(NAVY); doc.rect(0, 0, W, H, "F");
    setFill([10, 10, 110]); doc.roundedRect(M, M, W - 2 * M, H - 2 * M, 8, 8, "F");
    setFill(LIME); doc.rect(M, M, 4, H - 2 * M, "F");
    // Decorative graphics on cover
    doc.addImage(imgLupa, "PNG", W - M - 70, M + 8, 60, 60, undefined, "FAST");
    doc.addImage(imgPorta, "PNG", W - M - 55, H - M - 70, 50, 60, undefined, "FAST");

    // Logo lettering (white)
    doc.addImage(logoBranco, "PNG", M + 16, M + 18, 60, 12, undefined, "FAST");
    setText(CYAN); doc.setFont("helvetica", "normal"); doc.setFontSize(11);
    doc.text("Soluções de Impacto Social", M + 16, M + 38);

    setText([255, 255, 255]); doc.setFont("helvetica", "bold"); doc.setFontSize(28);
    doc.text("Diagnóstico de", M + 16, M + 70);
    doc.text("Maturidade em", M + 16, M + 82);
    doc.text("Voluntariado", M + 16, M + 94);
    doc.text("Corporativo", M + 16, M + 106);

    setText(LIME); doc.setFont("helvetica", "italic"); doc.setFontSize(11);
    doc.text("Gerado por Inteligência Artificial Freehelper", M + 16, M + 120);

    setText([255, 255, 255]); doc.setFont("helvetica", "bold"); doc.setFontSize(11);
    doc.text(lead.empresa, M + 16, H - M - 50);
    doc.setFont("helvetica", "normal"); doc.setFontSize(10);
    setText([200, 200, 230]);
    doc.text(`Responsável: ${lead.nome}`, M + 16, H - M - 42);
    doc.text(
      `Data: ${new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}`,
      M + 16, H - M - 35
    );
    rodape(1);

    // ========== PAGE 2 — Score & Sumário ==========
    doc.addPage();
    setFill(NAVY); doc.rect(0, 0, W, 28, "F");
    setFill(LIME); doc.rect(0, 28, W, 1.5, "F");
    doc.addImage(logoBranco, "PNG", W - M - 32, 10, 28, 9, undefined, "FAST");
    setText([255, 255, 255]); doc.setFont("helvetica", "bold"); doc.setFontSize(16);
    doc.text("Score & Sumário Executivo", M, 18);

    // Score block
    const cy = 60;
    setDraw(NAVY); doc.setLineWidth(2);
    doc.ellipse(M + 22, cy, 18, 18, "S");
    setText(NAVY); doc.setFont("helvetica", "bold"); doc.setFontSize(26);
    doc.text(String(scores.total), M + 22, cy + 3, { align: "center" });
    doc.setFontSize(8); doc.setFont("helvetica", "normal");
    doc.text("/100", M + 22, cy + 11, { align: "center" });

    setText(NAVY); doc.setFont("helvetica", "bold"); doc.setFontSize(18);
    doc.text(level.name, M + 50, cy - 4);
    setText([90, 90, 110]); doc.setFont("helvetica", "normal"); doc.setFontSize(10);
    const descLines = doc.splitTextToSize(level.desc, W - M - 50 - M);
    doc.text(descLines, M + 50, cy + 4);

    // Sumário
    let y = 95;
    setText(NAVY); doc.setFont("helvetica", "bold"); doc.setFontSize(13);
    doc.text("Sumário Executivo", M, y); y += 6;
    setText([60, 60, 80]); doc.setFont("helvetica", "normal"); doc.setFontSize(10);
    const sumLines = doc.splitTextToSize(report.sumario, W - 2 * M);
    doc.text(sumLines, M, y);
    y += sumLines.length * 5 + 8;

    // Scores por dimensão
    setText(NAVY); doc.setFont("helvetica", "bold"); doc.setFontSize(13);
    doc.text("Scores por Dimensão", M, y); y += 8;

    DIMENSIONS.forEach((d) => {
      const sc = scores.dims[d.key];
      const c: [number, number, number] = sc >= 70 ? FOREST : sc >= 45 ? [234, 179, 8] : RED;
      setText(NAVY); doc.setFont("helvetica", "bold"); doc.setFontSize(10);
      doc.text(d.name, M, y);
      setText(c); doc.text(`${sc}/100`, W - M, y, { align: "right" });
      setFill([238, 240, 246]); doc.roundedRect(M, y + 2, W - 2 * M, 4, 2, 2, "F");
      setFill(c); doc.roundedRect(M, y + 2, ((W - 2 * M) * sc) / 100, 4, 2, 2, "F");
      y += 12;
    });
    rodape(2);

    // ========== PAGE 3 — Forças & Gaps ==========
    doc.addPage();
    pageHeader(doc, "Forças & Gaps Críticos");
    y = 40;
    setText(NAVY); doc.setFont("helvetica", "bold"); doc.setFontSize(13);
    doc.text("✓ Pontos Fortes", M, y); y += 6;
    report.pontos_fortes.forEach((p) => {
      const lines = doc.splitTextToSize(p, W - 2 * M - 8);
      const h = lines.length * 5 + 6;
      setFill([232, 246, 238]); doc.roundedRect(M, y, W - 2 * M, h, 3, 3, "F");
      setFill(FOREST); doc.ellipse(M + 4, y + h / 2, 1.4, 1.4, "F");
      setText([20, 60, 40]); doc.setFont("helvetica", "normal"); doc.setFontSize(9.5);
      doc.text(lines, M + 9, y + 5);
      y += h + 3;
    });

    y += 6;
    setText(NAVY); doc.setFont("helvetica", "bold"); doc.setFontSize(13);
    doc.text("⚠ Gaps Críticos", M, y); y += 6;
    report.gaps.forEach((g) => {
      const lines = doc.splitTextToSize(g, W - 2 * M - 8);
      const h = lines.length * 5 + 6;
      setFill([253, 235, 236]); doc.roundedRect(M, y, W - 2 * M, h, 3, 3, "F");
      setFill(RED); doc.rect(M, y, 1.5, h, "F");
      setText([100, 20, 25]); doc.setFont("helvetica", "normal"); doc.setFontSize(9.5);
      doc.text(lines, M + 6, y + 5);
      y += h + 3;
    });
    rodape(3);

    // ========== PAGE 4 — Análise por Dimensão ==========
    doc.addPage();
    pageHeader(doc, "Análise por Dimensão");
    y = 40;
    DIMENSIONS.forEach((d) => {
      const txt = report.analise_dimensoes[d.key] || "—";
      const lines = doc.splitTextToSize(txt, W - 2 * M - 8);
      const blockH = lines.length * 5 + 14;
      const c = hexToRgb(d.color);
      setFill(c); doc.roundedRect(M, y, W - 2 * M, 9, 2, 2, "F");
      setText([255, 255, 255]); doc.setFont("helvetica", "bold"); doc.setFontSize(10);
      doc.text(d.name, M + 4, y + 6);
      doc.text(`${scores.dims[d.key]}/100`, W - M - 4, y + 6, { align: "right" });
      setFill([248, 249, 252]); doc.rect(M, y + 9, W - 2 * M, blockH - 9, "F");
      setText([60, 60, 80]); doc.setFont("helvetica", "normal"); doc.setFontSize(9.5);
      doc.text(lines, M + 4, y + 15);
      y += blockH + 4;
    });
    rodape(4);

    // ========== PAGE 5 — Plano de Ação ==========
    doc.addPage();
    pageHeader(doc, "Plano de Ação");
    y = 40;
    report.recomendacoes.forEach((rec, i) => {
      const lines = doc.splitTextToSize(rec.descricao, W - 2 * M - 10);
      const h = 16 + lines.length * 5 + 10;
      const c: [number, number, number] = rec.prazo.startsWith("Curto") ? RED : rec.prazo.startsWith("Médio") ? [234, 179, 8] : FOREST;
      setFill([248, 249, 252]); doc.roundedRect(M, y, W - 2 * M, h, 3, 3, "F");
      setFill(c); doc.rect(M, y, 2, h, "F");
      setText(NAVY); doc.setFont("helvetica", "bold"); doc.setFontSize(11);
      doc.text(`${i + 1}. ${rec.titulo}`, M + 6, y + 7);
      setText([60, 60, 80]); doc.setFont("helvetica", "normal"); doc.setFontSize(9.5);
      doc.text(lines, M + 6, y + 14);
      // pills
      const py = y + h - 6;
      setFill(c); doc.roundedRect(M + 6, py - 4, doc.getTextWidth(rec.prazo) + 6, 5.5, 2.75, 2.75, "F");
      setText([255, 255, 255]); doc.setFont("helvetica", "bold"); doc.setFontSize(7.5);
      doc.text(rec.prazo, M + 9, py);
      setText([60, 60, 80]); doc.setFont("helvetica", "normal"); doc.setFontSize(8);
      doc.text(`Impacto: ${rec.impacto}`, M + 14 + doc.getTextWidth(rec.prazo), py);
      y += h + 4;
    });
    rodape(5);

    // ========== PAGE 6 — Próximos Passos ==========
    doc.addPage();
    pageHeader(doc, "Próximos Passos");
    y = 40;
    // Mensagem final
    const mfLines = doc.splitTextToSize(report.mensagem_final, W - 2 * M - 10);
    const mfH = mfLines.length * 5 + 10;
    setFill([232, 234, 250]); doc.roundedRect(M, y, W - 2 * M, mfH, 3, 3, "F");
    setFill(NAVY); doc.rect(M, y, 2, mfH, "F");
    setText(NAVY); doc.setFont("helvetica", "italic"); doc.setFontSize(10.5);
    doc.text(mfLines, M + 6, y + 7);
    y += mfH + 10;

    // Serviços 2x2
    setText(NAVY); doc.setFont("helvetica", "bold"); doc.setFontSize(13);
    doc.text("Como a Freehelper pode ajudar", M, y); y += 6;
    const services = [
      ["Estruturação de Programas", "Política, governança e estratégia ESG."],
      ["Gestão e Mensuração", "Plataforma e métricas de impacto (SROI)."],
      ["Capacitação e Engajamento", "Programas para colaboradores e liderança."],
      ["Curadoria de Parceiros", "Rede curada de ONGs no Brasil."],
    ];
    const cw = (W - 2 * M - 4) / 2;
    services.forEach((s, i) => {
      const cx = M + (i % 2) * (cw + 4);
      const cyy = y + Math.floor(i / 2) * 26;
      setFill([248, 249, 252]); doc.roundedRect(cx, cyy, cw, 22, 3, 3, "F");
      setText(NAVY); doc.setFont("helvetica", "bold"); doc.setFontSize(10);
      doc.text(s[0], cx + 4, cyy + 8);
      setText([90, 90, 110]); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
      const dl = doc.splitTextToSize(s[1], cw - 8);
      doc.text(dl, cx + 4, cyy + 14);
    });
    y += 60;

    // CTA final
    setFill(NAVY); doc.roundedRect(M, y, W - 2 * M, 40, 4, 4, "F");
    setDraw(LIME); doc.setLineWidth(0.8); doc.roundedRect(M, y, W - 2 * M, 40, 4, 4, "S");
    setText([255, 255, 255]); doc.setFont("helvetica", "bold"); doc.setFontSize(14);
    doc.text("Fale com a Freehelper", W / 2, y + 12, { align: "center" });
    setText(CYAN); doc.setFont("helvetica", "normal"); doc.setFontSize(10);
    doc.text("freehelper.com.br", W / 2, y + 22, { align: "center" });
    setText([200, 200, 230]); doc.text("contato@freehelper.com.br", W / 2, y + 30, { align: "center" });
    rodape(6);

    doc.save(`diagnostico-freehelper-${lead.empresa.replace(/\s+/g, "-").toLowerCase()}.pdf`);
  } catch (e) {
    console.error(e);
    alert("Não foi possível gerar o PDF: " + (e as Error).message);
  }
}

function pageHeader(doc: jsPDF, title: string, logo?: string) {
  const W = 210, M = 20;
  doc.setFillColor(3, 3, 140); doc.rect(0, 0, W, 28, "F");
  doc.setFillColor(213, 244, 101); doc.rect(0, 28, W, 1.5, "F");
  if (logo) doc.addImage(logo, "PNG", W - M - 28, 10, 24, 8, undefined, "FAST");
  doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(16);
  doc.text(title, M, 18);
}

function hexToRgb(h: string): [number, number, number] {
  const m = h.replace("#", "");
  return [parseInt(m.slice(0, 2), 16), parseInt(m.slice(2, 4), 16), parseInt(m.slice(4, 6), 16)];
}
