import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * A tall vertical ribbon pinned to the viewport edge works on desktop/tablet
 * (there's margin outside the content column to spare). On phones there's no
 * safe empty margin for a fixed floating element to live in without eventually
 * sitting on top of grid content while scrolling — so on mobile the cart
 * indicator lives in the navbar instead, and this purely-promotional badge is
 * simply not shown rather than risk covering any card.
 */
const FlashingOfferBox = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/products")}
      className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 rounded-r-xl bg-gradient-to-b
        from-crimson-600 to-ember-600 px-2 py-4 text-white shadow-premium
        transition-transform duration-300 hover:translate-x-0.5 sm:block"
      style={{ writingMode: "vertical-rl" }}
      aria-label="View offers on all products"
    >
      <span className="mb-1 block text-lg font-black tracking-wide sm:text-xl">90% OFF</span>
      <span className="block text-[11px] font-semibold sm:text-xs">Min ₹3000</span>
    </button>
  );
};

export default FlashingOfferBox;
