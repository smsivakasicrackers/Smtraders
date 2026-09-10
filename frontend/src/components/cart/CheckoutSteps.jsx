import React from "react";
import { Check } from "lucide-react";

// Purely visual 4-step progress indicator for the enquiry flow:
// Cart -> Shipping -> Confirm -> Invoice. No routing/state side effects.
const STEPS = ["Cart", "Shipping", "Confirm", "Invoice"];

export default function CheckoutSteps({ current = 1 }) {
  return (
    <nav aria-label="Order progress" className="border-b border-ink-100 bg-white">
      <ol className="section-container flex items-center py-4 sm:py-5">
        {STEPS.map((label, idx) => {
          const step = idx + 1;
          const isComplete = step < current;
          const isActive = step === current;
          const isLast = step === STEPS.length;

          return (
            <li
              key={label}
              className={`flex items-center ${isLast ? "flex-none" : "flex-1"}`}
            >
              <div className="flex items-center gap-2">
                <span
                  aria-current={isActive ? "step" : undefined}
                  className={[
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors sm:h-8 sm:w-8 sm:text-xs",
                    isComplete || isActive
                      ? "bg-crimson-600 text-white"
                      : "bg-ink-100 text-ink-400",
                    isActive && "ring-4 ring-crimson-100",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {isComplete ? <Check className="h-4 w-4" strokeWidth={3} /> : step}
                </span>
                <span
                  className={[
                    "hidden text-xs font-semibold uppercase tracking-wide sm:inline",
                    isActive
                      ? "text-ink-900"
                      : isComplete
                      ? "text-ink-600"
                      : "text-ink-400",
                  ].join(" ")}
                >
                  {label}
                </span>
              </div>
              {!isLast && (
                <span
                  className={[
                    "mx-2 h-0.5 flex-1 rounded-full sm:mx-3",
                    isComplete ? "bg-crimson-600" : "bg-ink-100",
                  ].join(" ")}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
