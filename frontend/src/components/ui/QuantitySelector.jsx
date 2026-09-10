import React from "react";
import { Minus, Plus } from "lucide-react";

/**
 * Purely presentational stepper — callers keep their own increase/decrease
 * logic (stock limits, toasts) and just pass handlers through.
 */
export default function QuantitySelector({
  value,
  onIncrease,
  onDecrease,
  disabled = false,
  size = "md",
  className = "",
}) {
  const dims = size === "sm" ? "h-7 w-7" : "h-8 w-8";

  return (
    <div
      className={`flex items-center rounded-xl border border-ink-200 bg-ink-50 p-1 ${className}`}
    >
      <button
        type="button"
        onClick={onDecrease}
        disabled={disabled}
        aria-label="Decrease quantity"
        className={`${dims} flex items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-white hover:text-crimson-600 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        <Minus size={16} strokeWidth={3} />
      </button>
      <span className="w-8 select-none text-center text-sm font-bold text-ink-900" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={disabled}
        aria-label="Increase quantity"
        className={`${dims} flex items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-white hover:text-crimson-600 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        <Plus size={16} strokeWidth={3} />
      </button>
    </div>
  );
}
