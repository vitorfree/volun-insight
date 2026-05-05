import { Clock, Download } from "lucide-react";
import letteringAzul from "@/assets/freehelper-azul.png";
import letteringBranco from "@/assets/freehelper-branco.png";

export function Logo({ color = "#ffffff", size = 28 }: { color?: string; size?: number }) {
  // Use white lettering on dark backgrounds, blue lettering on light ones
  const isDark = color.toLowerCase() === "#ffffff" || color.toLowerCase() === "#fff";
  const src = isDark ? letteringBranco : letteringAzul;
  // size controls height in px; width auto
  return (
    <img
      src={src}
      alt="freehelper"
      style={{ height: size, width: "auto", display: "block" }}
    />
  );
}

export function ClockIcon({ size = 18 }: { size?: number }) {
  return <Clock size={size} strokeWidth={2.4} />;
}
export function DownloadIcon({ size = 18 }: { size?: number }) {
  return <Download size={size} strokeWidth={2.4} />;
}
