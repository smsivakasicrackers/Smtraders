import React, { useState } from "react";
import { ShoppingCart, Eye } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addCartItem } from "../../actions/cartActions";
import { Badge, Button, PriceDisplay, QuantitySelector } from "../../components/ui";
import ProductDetailModal from "../../components/product-section/ProductDetailModal";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isOutOfStock = !product.stock || Number(product.stock) <= 0;

  // ✅ Increase Quantity
  const increaseQty = (e) => {
    e?.stopPropagation?.();
    if (isOutOfStock) {
      return toast.error("This product is out of stock!");
    }
    if (quantity >= product.stock) {
      return toast.warning("Maximum stock reached!");
    }
    setQuantity((prevQty) => prevQty + 1);
  };

  // ✅ Decrease Quantity
  const decreaseQty = (e) => {
    e?.stopPropagation?.();
    if (quantity === 1) {
      return toast.info("Minimum quantity is 1");
    }
    setQuantity((prevQty) => prevQty - 1);
  };

  // ✅ Add to Cart
  const handleAddToCart = (e) => {
    e?.stopPropagation?.();
    if (isOutOfStock) {
      return toast.error("This product is out of stock!");
    }
    if (quantity > product.stock) {
      return toast.warning(`Only ${product.stock} available in stock!`);
    }
    dispatch(addCartItem(product._id, quantity, product));
    toast.success("Added to cart!");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        onClick={handleOpenModal}
        className="group relative flex h-full w-full cursor-pointer flex-col rounded-card border border-ink-200 bg-ink-100 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
      >
        {/* Product Image Section */}
        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-t-card bg-transparent p-2.5 sm:p-3">
          <img
            src={product.images?.[0]?.image || "https://placehold.co/400x500/png?text=Product"}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
          />

          {/* Quick View Overlay (Amazon / Flipkart style) */}
          <div className="absolute inset-0 flex items-center justify-center bg-ink-950/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-ink-900 shadow-md transition-transform hover:scale-105">
              <Eye className="h-3.5 w-3.5 text-crimson-600" />
              Quick View
            </span>
          </div>

          {/* Discount Badge */}
          {product.originalPrice && (
            <div className="absolute left-0 top-3 rounded-r-lg bg-crimson-600 px-2.5 py-1 text-[10px] font-bold tracking-widest text-white shadow-sm sm:px-3 sm:py-1.5 sm:text-[11px]">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}

          {/* Stock Badge */}
          <div className="absolute bottom-3 right-3">
            <Badge tone={product.stock > 0 ? "success" : "danger"} className="!px-2 !py-0.5 text-[9px] sm:!px-3 sm:!py-1 sm:text-xs">
              {product.stock > 0 ? "Available" : "Sold Out"}
            </Badge>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-grow flex-col p-3 sm:p-6">
          {/* Title */}
          <h3 className="mb-1 line-clamp-2 font-display text-[13px] font-semibold leading-snug tracking-tight text-ink-900 transition-colors group-hover:text-crimson-600 sm:mb-2 sm:text-[19px] sm:leading-tight">
            {product.name}
          </h3>

          <p className="mb-2 line-clamp-1 text-[11px] text-ink-500 sm:mb-4 sm:text-[13px]">
            {product.description || "Premium quality firework"}
          </p>

          <div className="flex-grow" />

          {/* Price Section */}
          <div className="mb-3 sm:mb-5">
            <p className="mb-0.5 text-[9px] font-bold uppercase tracking-widest text-ink-400 sm:mb-1 sm:text-[10px]">
              Price
            </p>
            <PriceDisplay
              price={product.price}
              originalPrice={product.originalPrice}
              showDiscount={false}
              size="sm"
            />
          </div>

          {/* Cart Controls — e.stopPropagation to prevent triggering modal when using controls */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between gap-2 border-t border-ink-100 pt-3 sm:gap-3 sm:pt-4"
          >
            {/* Quantity */}
            <QuantitySelector value={quantity} onIncrease={increaseQty} onDecrease={decreaseQty} disabled={isOutOfStock} size="sm" />

            {/* Add Button */}
            <Button
              variant="primary"
              size="sm"
              icon={ShoppingCart}
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              aria-label={`Add ${product.name} to cart`}
              className="!h-9 !w-9 shrink-0 !p-0 sm:!h-auto sm:!w-auto sm:flex-1 sm:!px-6 sm:!py-2"
            >
              <span className="hidden uppercase tracking-wider sm:inline">Add</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Product Description Popup Modal */}
      <ProductDetailModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Product;
