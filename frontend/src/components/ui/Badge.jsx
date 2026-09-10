import React from "react";

const TONES = {
  crimson: "bg-crimson-50 text-crimson-700 border-crimson-200",
  gold: "bg-gold-50 text-gold-800 border-gold-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  warning: "bg-amber-50 text-amber-800 border-amber-200",
  neutral: "bg-ink-100 text-ink-700 border-ink-200",
  dark: "bg-ink-900 text-white border-ink-900",
};

export default function Badge({ tone = "neutral", className = "", children }) {
  const classes = [
    "inline-flex items-center gap-1 rounded-pill border px-3 py-1 text-xs font-semibold",
    TONES[tone] || TONES.neutral,
    className,
  ].join(" ");

  return <span className={classes}>{children}</span>;
}
