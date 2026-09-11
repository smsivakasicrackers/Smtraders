import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MapPin, Phone, User } from "lucide-react";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../../Pages/Home/MetaData";
import { Button, Card } from "../ui";

const MIN_ORDER_AMOUNT = 3000;

export default function ConfirmOrder() {
  const { shippingInfo, items: cartItems } = useSelector((state) => state.cartState);
  const navigate = useNavigate();

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    // Nothing to review (empty cart, or a stale visit after an order was
    // already completed) — send the customer back to build a list first.
    if (cartItems.length === 0) {
      navigate("/Mycart", { replace: true });
      return;
    }
    if (itemsPrice < MIN_ORDER_AMOUNT) {
      toast.error(`Minimum order amount is ₹${MIN_ORDER_AMOUNT}.`);
      navigate("/Mycart", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const taxPrice = Number(0.05 * itemsPrice).toFixed(2);
  const totalPrice = (Number(itemsPrice) + Number(taxPrice)).toFixed(2);

  const processPayment = () => {
    const data = { itemsPrice, taxPrice, totalPrice };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />
      <CheckoutSteps current={3} />

      <section className="section-container py-10 sm:py-12">
        <h1 className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
          Review Your Order
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          Double-check your details and items before generating your invoice.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left side - shipping info + items */}
          <Card padding="lg" className="lg:col-span-2">
            {/* Shipping Info */}
            <div className="mb-8">
              <h3 className="border-b border-ink-100 pb-2 font-display text-lg font-semibold text-ink-900">
                Shipping Information
              </h3>
              <div className="mt-4 space-y-2.5 text-sm text-ink-700">
                <p className="flex items-start gap-2.5">
                  <User className="mt-0.5 h-4 w-4 shrink-0 text-crimson-600" />
                  <span>{shippingInfo.name}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-crimson-600" />
                  <span>{shippingInfo.phoneNo}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-crimson-600" />
                  <span>
                    {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode},{" "}
                    {shippingInfo.state}
                  </span>
                </p>
              </div>
            </div>

            {/* Cart Items */}
            <div>
              <h3 className="border-b border-ink-100 pb-2 font-display text-lg font-semibold text-ink-900">
                Your Items
              </h3>
              <div className="mt-4 space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 border-b border-ink-50 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-md border border-ink-100 bg-ink-50 object-contain"
                      />
                      <h4 className="font-medium capitalize text-ink-900">{item.name}</h4>
                    </div>
                    <p className="text-sm text-ink-700 sm:text-base">
                      {item.quantity} × ₹{item.price}{" "}
                      <span className="ml-1 font-semibold text-ink-900">
                        = ₹{item.quantity * item.price}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Right side - summary */}
          <Card padding="lg" className="h-fit">
            <h3 className="border-b border-ink-100 pb-2 font-display text-lg font-semibold text-ink-900">
              Order Summary
            </h3>
            <div className="mt-4 space-y-3 text-sm text-ink-700">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-ink-900">₹{itemsPrice}</span>
              </p>
              <p className="flex justify-between">
                <span>Tax (5%)</span>
                <span className="font-medium text-ink-900">₹{taxPrice}</span>
              </p>
              <hr className="my-1 border-ink-100" />
              <p className="flex justify-between text-base font-semibold text-ink-900">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </p>
            </div>

            <Button onClick={processPayment} className="mt-6 w-full" size="lg">
              Confirm Order
            </Button>
            <p className="mt-3 text-center text-xs text-ink-400">
              This confirms your enquiry — payment is completed separately via GPay/UPI.
            </p>
          </Card>
        </div>
      </section>
    </Fragment>
  );
}
