import React from "react";
import { ShieldAlert } from "lucide-react";

/**
 * Statutory compliance notice (2018 Supreme Court of India order restricting
 * online sale of firecrackers). Text is fixed/legal — do not reword.
 */
export default function LegalNotice({ className = "" }) {
  return (
    <div
      className={`rounded-card border border-gold-500/30 bg-ink-950 px-5 py-5 sm:px-8 sm:py-6 ${className}`}
    >
      <div className="mx-auto flex max-w-4xl items-start gap-3 sm:gap-4">
        <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-gold-400" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-ink-200 sm:text-[15px]">
          <strong className="text-gold-300">As per 2018 Supreme Court Order,</strong> Online Sale
          of Firecrackers are NOT permitted. We value our customers and at the same time, we
          respect the jurisdiction. We request our customers to select your products in the
          Estimate page to see your estimation and submit the required crackers through the Get
          Estimate button.
        </p>
      </div>
    </div>
  );
}
