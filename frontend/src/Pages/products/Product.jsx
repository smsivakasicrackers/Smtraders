import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addCartItem } from "../../actions/cartActions";
import { Badge, Button, PriceDisplay, QuantitySelector } from "../../components/ui";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  // ✅ Increase Quantity
  const increaseQty = () => {
    if (product.stock === 0 || quantity >= product.stock) {
      return toast("Maximum stock reached!", { type: "warning" });
    }
    setQuantity((prevQty) => prevQty + 1);
  };

  // ✅ Decrease Quantity
  const decreaseQty = () => {
    if (quantity === 1) {
      return toast("Minimum quantity is 1", { type: "info" });
    }
    setQuantity((prevQty) => prevQty - 1);
  };

  // ✅ Add to Cart
  const handleAddToCart = () => {
    if (product.stock === 0) {
      return toast("This product is out of stock!", { type: "error" });
    }
    dispatch(addCartItem(product._id, quantity));
    toast("Added to cart!", { type: "success" });
  };

  return (
    <div className="group flex h-full w-full flex-col rounded-card border border-ink-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
      {/* Product Image Section */}
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-t-card bg-gradient-to-br from-paper-100 via-paper-50 to-paper-200 p-2.5 sm:p-3">
        <img
          src={product.images?.[0]?.image || "https://placehold.co/400x500/png?text=Product"}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
        />

        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute left-0 top-3 rounded-r-lg bg-crimson-600 px-2.5 py-1 text-[10px] font-bold tracking-widest text-white shadow-sm sm:px-3 sm:py-1.5 sm:text-[11px]">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Stock Badge — bottom-right so it never collides with the discount badge on narrow cards */}
        <div className="absolute bottom-3 right-3">
          <Badge tone={product.stock > 0 ? "success" : "danger"} className="!px-2 !py-0.5 text-[9px] sm:!px-3 sm:!py-1 sm:text-xs">
            {product.stock > 0 ? "Available" : "Sold Out"}
          </Badge>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="flex flex-grow flex-col p-3 sm:p-6">
        {/* Title */}
        <h3 className="mb-1 line-clamp-2 font-display text-[13px] font-semibold leading-snug tracking-tight text-ink-900 sm:mb-2 sm:text-[19px] sm:leading-tight">
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

        {/* Cart Controls */}
        <div className="flex items-center justify-between gap-2 border-t border-ink-100 pt-3 sm:gap-3 sm:pt-4">
          {/* Quantity */}
          <QuantitySelector value={quantity} onIncrease={increaseQty} onDecrease={decreaseQty} size="sm" />

          {/* Add Button — icon-only on narrow cards (no room for a label next
              to the quantity stepper without overflowing), full label from
              `sm` up where there's space for both. */}
          <Button
            variant="primary"
            size="sm"
            icon={ShoppingCart}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            aria-label={`Add ${product.name} to cart`}
            className="!h-9 !w-9 shrink-0 !p-0 sm:!h-auto sm:!w-auto sm:flex-1 sm:!px-6 sm:!py-2"
          >
            <span className="hidden uppercase tracking-wider sm:inline">Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
