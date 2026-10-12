import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  Sparkles,
  Star,
  CheckCircle2,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addCartItem } from "../../actions/cartActions";
import { Badge, QuantitySelector } from "../ui";

/**
 * Amazon / Flipkart-inspired Product Quick View & Description Modal
 * Shows full product image, detailed description, factory pricing,
 * savings breakdown, stock status, quantity controls, and Add to Cart / Buy Now actions.
 */
const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Reset quantity when opened or product changes
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, product]);

  // Lock background scroll when modal is active & listen to Escape key
  useEffect(() => {
    if (!isOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const hasDiscount = Boolean(product.originalPrice) && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const savingsAmount = hasDiscount ? product.originalPrice - product.price : 0;
  const subtotal = product.price * quantity;

  const increaseQty = () => {
    if (product.stock === 0 || quantity >= product.stock) {
      return toast.warning("Maximum available stock reached!");
    }
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) {
      return toast.info("Minimum quantity is 1");
    }
    setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (product.stock === 0) {
      return toast.error("This product is currently out of stock!");
    }
    dispatch(addCartItem(product._id, quantity, product));
    toast.success(`Added ${quantity} × ${product.name} to cart!`);
  };

  const handleBuyNow = () => {
    if (product.stock === 0) {
      return toast.error("This product is currently out of stock!");
    }
    dispatch(addCartItem(product._id, quantity, product));
    toast.success(`Added ${product.name} to cart! Proceeding to checkout...`);
    onClose();
    navigate("/Mycart");
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-premium animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-3.5 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-crimson-600 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-crimson-700">
              Direct from Sivakasi
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="rounded-full p-1.5 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            {/* Left Column: Product Image & Badges (5 cols) */}
            <div className="flex flex-col md:col-span-5">
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-ink-100 bg-paper-50 p-4">
                <img
                  src={product.images?.[0]?.image || "https://placehold.co/500x500/png?text=Product"}
                  alt={product.name}
                  className="h-full w-full object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
                />

                {/* Discount Badge */}
                {hasDiscount && (
                  <div className="absolute left-3 top-3 rounded-lg bg-crimson-600 px-3 py-1 text-xs font-black tracking-wider text-white shadow-md">
                    {discountPct}% OFF
                  </div>
                )}

                {/* Stock Badge */}
                <div className="absolute bottom-3 right-3">
                  <Badge tone={product.stock > 0 ? "success" : "danger"} className="!px-3 !py-1 text-xs font-semibold">
                    {product.stock > 0 ? `In Stock (${product.stock})` : "Sold Out"}
                  </Badge>
                </div>
              </div>

              {/* Quality Guarantee Tags */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="flex items-center justify-center gap-1.5 rounded-lg border border-ink-100 bg-ink-50/70 p-2 text-ink-700">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">100% Genuine</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 rounded-lg border border-ink-100 bg-ink-50/70 p-2 text-ink-700">
                  <Sparkles className="h-4 w-4 text-gold-500 shrink-0" />
                  <span className="font-medium">Factory Direct</span>
                </div>
              </div>
            </div>

            {/* Right Column: Information, Pricing, Description, Actions (7 cols) */}
            <div className="flex flex-col md:col-span-7">
              {/* Category & Rating */}
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-crimson-50 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-crimson-700">
                  {product.category || "Fireworks"}
                </span>

                <div className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                  <Star className="h-3.5 w-3.5 fill-emerald-600 text-emerald-600" />
                  <span>4.8</span>
                  <span className="text-ink-400 font-normal">| Verified</span>
                </div>
              </div>

              {/* Product Title */}
              <h2
                id="product-modal-title"
                className="font-display text-xl font-bold tracking-tight text-ink-900 sm:text-2xl"
              >
                {product.name}
              </h2>

              {/* Pricing section (Amazon / Flipkart style) */}
              <div className="mt-3 rounded-xl border border-ink-100 bg-ink-50/50 p-3.5 sm:p-4">
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <span className="text-2xl font-black text-crimson-600 sm:text-3xl">
                    ₹{product.price}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm font-medium text-ink-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                      Save ₹{savingsAmount} ({discountPct}% OFF)
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-ink-400">
                  Special Sivakasi Festive Offer • Inclusive of all taxes
                </p>
              </div>

              {/* Description Section */}
              <div className="mt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink-400">
                  Product Description
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-700 whitespace-pre-line">
                  {product.description ||
                    "Premium handcrafted Sivakasi firework made with supreme safety standards. Offers brilliant burst effects and vibrant illumination for your family celebrations."}
                </p>
              </div>

              {/* Specifications / Highlights */}
              <div className="mt-4 rounded-xl border border-ink-100 p-3 bg-white">
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-400 mb-2">
                  Key Highlights
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-700">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Brand: SM Crackers</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Eco-friendly & Low Smoke</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Quality Safety Tested</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Dispatch: 24-48 Hours</span>
                  </li>
                </ul>
              </div>

              {/* Quantity Selector & Subtotal */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-ink-100 pt-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-500">
                    Quantity:
                  </span>
                  <QuantitySelector
                    value={quantity}
                    onIncrease={increaseQty}
                    onDecrease={decreaseQty}
                    disabled={product.stock === 0}
                    size="md"
                  />
                </div>

                <div className="text-right">
                  <span className="block text-[11px] font-medium text-ink-400 uppercase tracking-wider">
                    Total
                  </span>
                  <span className="text-lg font-black text-ink-900">
                    ₹{subtotal}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Buy Now (Flipkart / Amazon style) */}
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex items-center justify-center gap-2 rounded-xl bg-crimson-600 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-crimson-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-ink-300"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex items-center justify-center gap-2 rounded-xl bg-ink-900 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-ink-800 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-ink-300"
                >
                  <Zap className="h-4 w-4 text-gold-400" />
                  Buy Now
                </button>
              </div>

              {/* Trust Footer */}
              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-ink-400">
                <span className="flex items-center gap-1">
                  <Truck className="h-3.5 w-3.5 text-crimson-600" /> Safe Packaging
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Best Price Guaranteed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductDetailModal;
