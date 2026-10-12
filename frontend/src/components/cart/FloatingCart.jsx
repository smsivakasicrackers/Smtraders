import React from "react";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

/**
 * Floating Cart Icon Button
 * Floats persistently on the right side (stacked above the WhatsApp button),
 * especially vital in mobile view so users can always see and access their cart.
 * Always visible even when 0 items are added, showing a 0 badge so user clearly understands.
 */
const FloatingCart = () => {
  const { items = [] } = useSelector((state) => state.cartState);
  const location = useLocation();

  // Do not show floating cart inside the cart/checkout flow or admin panel
  const hideOnPaths = ["/Mycart", "/shipping", "/payment", "/order/confirm"];
  if (hideOnPaths.includes(location.pathname) || location.pathname.startsWith("/admin")) {
    return null;
  }

  const totalItems = items ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const totalAmount = items ? items.reduce((acc, item) => acc + item.quantity * item.price, 0) : 0;

  return (
    <Link
      to="/Mycart"
      aria-label={
        totalItems > 0
          ? `View cart, ${totalItems} items, ₹${totalAmount}`
          : "View cart (0 items)"
      }
      className="group fixed bottom-[74px] right-5 z-40 flex h-12 w-12 items-center justify-center
                 rounded-full bg-crimson-600 text-white shadow-premium
                 transition-all duration-300 hover:scale-110 hover:bg-crimson-700
                 active:scale-95 sm:bottom-[88px] sm:right-6 sm:h-14 sm:w-14"
    >
      <div className="relative flex h-full w-full items-center justify-center">
        {/* Shopping Cart Icon */}
        <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:scale-110" />

        {/* Counter Badge — always visible (shows 0 when empty so user understands) */}
        <span
          className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white text-[10px] font-black sm:h-5 sm:w-5 sm:text-[11px] shadow-sm ${
            totalItems > 0
              ? "bg-gold-400 text-ink-950 animate-pulse"
              : "bg-white text-crimson-700"
          }`}
        >
          {totalItems > 99 ? "99+" : totalItems}
        </span>

        {/* Subtle tooltip on hover / accessibility */}
        <span className="pointer-events-none absolute right-full mr-2.5 hidden rounded-lg bg-ink-900/90 px-2 py-1 text-[11px] font-semibold text-white whitespace-nowrap shadow-md group-hover:block sm:text-xs">
          {totalItems > 0 ? `Cart: ₹${totalAmount}` : "Cart (0)"}
        </span>
      </div>
    </Link>
  );
};

export default FloatingCart;
