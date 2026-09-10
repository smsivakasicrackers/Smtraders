import React from "react";

const TONES = {
  crimson: "bg-crimson-50 text-crimson-700",
  gold: "bg-gold-50 text-gold-700",
  emerald: "bg-emerald-50 text-emerald-700",
  ink: "bg-ink-100 text-ink-700",
  amber: "bg-amber-50 text-amber-700",
};

export default function StatCard({ icon: Icon, label, value, tone = "crimson", className = "" }) {
  return (
    <div className={`card-surface flex items-center gap-4 p-5 ${className}`}>
      {Icon && (
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${TONES[tone] || TONES.crimson}`}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
      )}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</p>
        <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
      </div>
    </div>
  );
}
