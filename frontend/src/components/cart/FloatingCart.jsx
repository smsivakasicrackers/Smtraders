import React from "react";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const FloatingCart = () => {
  const { items } = useSelector((state) => state.cartState);
  const location = useLocation();

  // Do not show floating cart inside the cart/checkout flow or admin panel
  const hideOnPaths = ["/Mycart", "/shipping", "/payment", "/order/confirm"];
  if (hideOnPaths.includes(location.pathname) || location.pathname.startsWith("/admin")) {
    return null;
  }

  // Only show if there are items in the cart
  if (!items || items.length === 0) {
    return null;
  }

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link
      to="/Mycart"
      className="fixed bottom-[84px] right-5 z-40 flex h-14 w-14 items-center justify-center
                 rounded-full bg-crimson-600 text-white shadow-premium
                 transition-transform duration-300 hover:scale-110 hover:bg-crimson-700
                 sm:bottom-[90px] sm:right-6"
      aria-label="View Cart"
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <ShoppingCart className="h-6 w-6" />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-400 text-[11px] font-bold text-ink-900 border-2 border-white">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      </div>
    </Link>
  );
};

export default FloatingCart;
