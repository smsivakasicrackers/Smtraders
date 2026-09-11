import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Trash2, ShoppingBag, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import {
  decreaseCartItemQty,
  increaseCartItemQty,
  removeItemFromCart,
} from "../../slices/cartSlice";
import { Button, Card, EmptyState } from "../ui";
import CheckoutSteps from "./CheckoutSteps";

const MIN_ORDER_AMOUNT = 3000;

export default function Cart() {
  const { items } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQty = (item) => {
    if (item.stock === 0 || item.quantity >= item.stock) return;
    dispatch(increaseCartItemQty(item.product));
  };

  const decreaseQty = (item) => {
    if (item.quantity === 1) return;
    dispatch(decreaseCartItemQty(item.product));
  };

  const totalAmount = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const totalUnits = items.reduce((acc, item) => acc + item.quantity, 0);

  const amountToMinimum = MIN_ORDER_AMOUNT - totalAmount;
  const meetsMinimum = totalAmount >= MIN_ORDER_AMOUNT;

  const checkoutHandler = () => {
    if (!meetsMinimum) {
      toast.error(`Minimum order amount is ₹${MIN_ORDER_AMOUNT}. Add ₹${amountToMinimum} more to continue.`);
      return;
    }
    navigate("/shipping");
  };

  return (
    <Fragment>
      {items.length === 0 ? (
        <div className="section-container flex min-h-[70vh] items-center justify-center py-16">
          <EmptyState
            icon={ShoppingBag}
            title="Your list is empty"
            description="You haven't added any crackers to your enquiry list yet. Browse our collections and start building your order."
            actionLabel="Browse Products"
            onAction={() => navigate("/products")}
            className="w-full max-w-md"
          />
        </div>
      ) : (
        <Fragment>
          <CheckoutSteps current={1} />

          <div className="section-container py-10 sm:py-12">
            <h1 className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
              Your List{" "}
              <span className="text-crimson-600">({items.length})</span>
            </h1>
            <p className="mt-1 text-sm text-ink-500">
              Review your items, then continue to shipping details to send your enquiry.
            </p>

            <div className="mt-8 flex flex-col gap-8 lg:flex-row">
              {/* Cart items */}
              <div className="flex-1 space-y-4">
                {items.map((item) => (
                  <Card
                    key={item.product}
                    padding="sm"
                    className="flex flex-col items-center gap-4 sm:flex-row"
                  >
                    {/* Image */}
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-ink-50 sm:h-28 sm:w-28">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="truncate font-display text-base font-semibold text-ink-900 sm:text-lg">
                        {item.name}
                      </h4>
                      <p className="mt-1 font-semibold text-crimson-700">
                        ₹{item.price}
                      </p>
                    </div>

                    {/* Quantity control */}
                    <div className="flex items-center rounded-xl border border-ink-200 bg-ink-50 p-1">
                      <button
                        type="button"
                        onClick={() => decreaseQty(item)}
                        disabled={item.quantity === 1}
                        aria-label="Decrease quantity"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-white hover:text-crimson-600 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus size={16} strokeWidth={3} />
                      </button>
                      <span className="w-9 select-none text-center text-sm font-bold text-ink-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => increaseQty(item)}
                        disabled={item.stock === 0 || item.quantity >= item.stock}
                        aria-label="Increase quantity"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-white hover:text-crimson-600 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => dispatch(removeItemFromCart(item.product))}
                      aria-label={`Remove ${item.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </Card>
                ))}
              </div>

              {/* Order summary */}
              <Card padding="lg" className="h-fit w-full lg:w-1/3">
                <h4 className="font-display text-lg font-semibold text-ink-900">
                  Order Summary
                </h4>
                <hr className="my-4 border-ink-100" />
                <div className="space-y-3 text-sm text-ink-700">
                  <p className="flex justify-between">
                    <span>Total Units</span>
                    <span className="font-medium text-ink-900">{totalUnits}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Estimated Total</span>
                    <span className="font-medium text-ink-900">₹{totalAmount}</span>
                  </p>
                </div>

                <hr className="my-4 border-ink-100" />

                {!meetsMinimum && (
                  <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      Minimum order is ₹{MIN_ORDER_AMOUNT}. Add ₹{amountToMinimum} more to
                      proceed.
                    </span>
                  </div>
                )}

                <Button
                  onClick={checkoutHandler}
                  disabled={!meetsMinimum}
                  className="w-full"
                  size="lg"
                >
                  Proceed to Shipping
                </Button>

                <Link
                  to="/products"
                  className="mt-3 block text-center text-sm text-ink-500 transition hover:text-crimson-600"
                >
                  Continue Shopping
                </Link>
              </Card>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
