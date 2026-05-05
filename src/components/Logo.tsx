import { Clock, Download } from "lucide-react";

export function Logo({ color = "#ffffff", size = 28 }: { color?: string; size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="8" r="3.5" fill={color} />
        <path
          d="M16 13c-3.5 0-6 2-7.5 4.5L4 24l2.5 1.5 4-5v8h3v-6h2.5v6h3v-8l4 5L26 24l-4.5-6.5C20 15 18 13 16 13Z"
          fill={color}
        />
      </svg>
      <span style={{ color, fontWeight: 700, fontSize: 22, letterSpacing: "-0.01em" }}>freehelper</span>
    </div>
  );
}

export function ClockIcon({ size = 18 }: { size?: number }) {
  return <Clock size={size} strokeWidth={2.4} />;
}
export function DownloadIcon({ size = 18 }: { size?: number }) {
  return <Download size={size} strokeWidth={2.4} />;
}
