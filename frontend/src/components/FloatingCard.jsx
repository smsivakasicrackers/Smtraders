import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const FloatingCard = () => {
  const { items } = useSelector((state) => state.cartState);
  const navigate = useNavigate();

  const totalAmount = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const goToCart = () => {
    navigate("/Mycart");
  };

  return (
    <button
      type="button"
      onClick={goToCart}
      aria-label={totalAmount > 0 ? `View cart, ₹${totalAmount}` : "Cart is empty"}
      className={`fixed right-5 top-24 z-40 flex items-center gap-2 rounded-full px-4 py-3 text-white shadow-premium
        transition-all duration-300 hover:scale-105 sm:right-6
        ${totalAmount > 0 ? "bg-crimson-600 hover:bg-crimson-700" : "bg-ink-300"}`}
    >
      <ShoppingCart className="h-4 w-4" />
      {totalAmount > 0 && <span className="text-xs font-bold">₹{totalAmount}</span>}
    </button>
  );
};

export default FloatingCard;
