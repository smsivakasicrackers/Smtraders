import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveShippingInfo } from "../../slices/cartSlice";
import CheckoutSteps from "./CheckoutSteps";

export const validateShipping = (shippingInfo, navigate) => {
  if (
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
    !shippingInfo.phoneNo ||
    !shippingInfo.postalCode
  ) {
    toast.error("Please fill the shipping information");
    navigate("/shipping");
  }
};

const fieldClasses =
  "w-full rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-800 outline-none transition focus:border-crimson-500 focus:ring-2 focus:ring-crimson-100";

const labelClasses = "mb-1.5 block text-sm font-medium text-ink-700";

export default function Shipping() {
  const { shippingInfo = {}, items: cartItems } = useSelector((state) => state.cartState);
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [name, setName] = useState(shippingInfo.name || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/Mycart", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ name, address, city, phoneNo, postalCode, state }));
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <CheckoutSteps current={2} />

      <div className="section-container flex justify-center py-12 sm:py-16">
        <div className="w-full max-w-md rounded-card border border-ink-100 bg-white p-6 shadow-card sm:p-8">
          <h1 className="font-display text-2xl font-semibold text-ink-900 text-center sm:text-3xl">
            Shipping Information
          </h1>
          <p className="mt-2 text-center text-sm text-ink-500">
            Tell us where to send your order — we'll use this on your invoice.
          </p>

          <form onSubmit={submitHandler} className="mt-8 space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name_field" className={labelClasses}>
                Full Name
              </label>
              <input
                type="text"
                id="name_field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={fieldClasses}
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address_field" className={labelClasses}>
                Address
              </label>
              <input
                type="text"
                id="address_field"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className={fieldClasses}
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city_field" className={labelClasses}>
                City
              </label>
              <input
                type="text"
                id="city_field"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className={fieldClasses}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone_field" className={labelClasses}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone_field"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
                className={fieldClasses}
              />
            </div>

            {/* Postal Code */}
            <div>
              <label htmlFor="postal_code_field" className={labelClasses}>
                Postal Code
              </label>
              <input
                type="number"
                id="postal_code_field"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                className={fieldClasses}
              />
            </div>

            {/* State */}
            <div>
              <label htmlFor="state_field" className={labelClasses}>
                State
              </label>
              <select
                id="state_field"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className={`${fieldClasses} bg-white`}
              >
                <option value="">Select State</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Kerala">Kerala</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>
                <option value="Maharashtra">Maharashtra</option>
              </select>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-primary w-full py-3 text-base">
              Continue
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
