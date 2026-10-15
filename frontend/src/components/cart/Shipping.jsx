import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveShippingInfo } from "../../slices/cartSlice";
import CheckoutSteps from "./CheckoutSteps";

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const UNION_TERRITORIES = [
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export const TAMIL_NADU_DISTRICTS = [
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kanchipuram",
  "Kanyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Mayiladuthurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivaganga",
  "Tenkasi",
  "Thanjavur",
  "Theni",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupathur",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar",
];

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

  // If saved state is Tamil Nadu and has a custom city, allow manual entry mode
  const [isCustomCity, setIsCustomCity] = useState(() => {
    if (shippingInfo.state === "Tamil Nadu" && shippingInfo.city) {
      return !TAMIL_NADU_DISTRICTS.includes(shippingInfo.city);
    }
    return false;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/Mycart", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    if (selectedState === "Tamil Nadu") {
      if (city && !TAMIL_NADU_DISTRICTS.includes(city)) {
        setIsCustomCity(true);
      } else {
        setIsCustomCity(false);
      }
    } else {
      setIsCustomCity(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!city || !city.trim()) {
      toast.error("Please provide a city or district");
      return;
    }
    dispatch(saveShippingInfo({ name, address, city: city.trim(), phoneNo, postalCode, state }));
    navigate("/order/confirm");
  };

  const isTamilNadu = state === "Tamil Nadu";

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

            {/* State */}
            <div>
              <label htmlFor="state_field" className={labelClasses}>
                State / Union Territory
              </label>
              <select
                id="state_field"
                value={state}
                onChange={handleStateChange}
                required
                className={`${fieldClasses} bg-white`}
              >
                <option value="">Select State / UT</option>
                <optgroup label="States">
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Union Territories">
                  {UNION_TERRITORIES.map((ut) => (
                    <option key={ut} value={ut}>
                      {ut}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* City / District */}
            <div>
              <label htmlFor="city_field" className={labelClasses}>
                {isTamilNadu ? "District / City" : "City"}
              </label>

              {isTamilNadu && !isCustomCity ? (
                <div>
                  <select
                    id="city_field"
                    value={city}
                    onChange={(e) => {
                      if (e.target.value === "__custom__") {
                        setIsCustomCity(true);
                        setCity("");
                      } else {
                        setCity(e.target.value);
                      }
                    }}
                    required
                    className={`${fieldClasses} bg-white`}
                  >
                    <option value="">Select Tamil Nadu District (38 Districts)</option>
                    {TAMIL_NADU_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                    <option value="__custom__">✏️ Other City / Town (Enter manually)</option>
                  </select>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    id="city_field"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={isTamilNadu ? "Enter town / city name" : "City"}
                    required
                    className={fieldClasses}
                  />
                  {isTamilNadu && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomCity(false);
                        setCity("");
                      }}
                      className="mt-1.5 text-xs font-medium text-crimson-600 hover:text-crimson-700 hover:underline"
                    >
                      ← Choose from 38 Tamil Nadu districts list
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Postal Code */}
            <div>
              <label htmlFor="postal_code_field" className={labelClasses}>
                Postal Code (PIN Code)
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
