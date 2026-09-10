import React from "react";

/**
 * Presents price/originalPrice exactly as computed elsewhere in the app —
 * this component does not calculate discount logic itself beyond the same
 * `(originalPrice - price) / originalPrice` percentage already used in the
 * product card, it only standardizes how it's displayed.
 */
export default function PriceDisplay({ price, originalPrice, size = "md", showDiscount = true }) {
  const hasDiscount = Boolean(originalPrice) && originalPrice > price;
  const discountPct = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const priceSize =
    size === "lg"
      ? "text-3xl sm:text-4xl"
      : size === "sm"
      ? "text-lg sm:text-2xl"
      : "text-2xl sm:text-3xl";

  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className={`font-black tracking-tight text-crimson-700 ${priceSize}`}>
        ₹{price}
      </span>
      {hasDiscount && (
        <span className="text-sm font-medium text-ink-400 line-through">₹{originalPrice}</span>
      )}
      {hasDiscount && showDiscount && (
        <span className="rounded-pill bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
          {discountPct}% OFF
        </span>
      )}
    </div>
  );
}
