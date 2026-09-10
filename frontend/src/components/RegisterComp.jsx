import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import { useLocation } from "react-router-dom";
import { Modal, Button } from "./ui";

const FIELD_CONFIG = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "phone", label: "Phone Number", type: "tel" },
  { name: "email", label: "Email", type: "email" },
  { name: "address", label: "Address", type: "text" },
];

const inputClasses =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder-ink-400 focus:border-crimson-400 focus:outline-none focus:ring-2 focus:ring-crimson-100";

const RegisterComp = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.authState);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("leadPopupShown");
    if (!location.pathname.includes("/admin") && !isAuthenticated && !isRegistered && !alreadyShown) {
      // Show once per session, not on a repeating interval — a popup that
      // nags every 10s on every page feels unprofessional, not premium.
      const timeout = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("leadPopupShown", "1");
      }, 10000);

      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, isAuthenticated]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    dispatch(register(formData));
    setIsRegistered(true);
    setSubmitting(false);
    setShowPopup(false);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  if (isAuthenticated) return null;

  return (
    <Modal
      open={showPopup}
      onClose={handleClose}
      title="Let's stay in touch"
    >
      <p className="mb-5 text-sm text-ink-500">
        Share your details and our team will reach out to help with your order.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {FIELD_CONFIG.map((field) => (
          <div key={field.name}>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
        ))}

        <Button type="submit" variant="primary" loading={submitting} className="w-full">
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default RegisterComp;
