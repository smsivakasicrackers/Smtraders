import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle, Instagram } from "lucide-react";
import { BRAND } from "../../constants/brand";
import LegalNotice from "../LegalNotice";

const COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/About" },
      // Combo Packs temporarily hidden until the new combo lineup is ready.
      { label: "Terms & Conditions", to: "/terms" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "All Fireworks", to: "/products" },
      { label: "Price List", to: "/Price" },
      { label: "Track Order", to: "/track-order" },
    ],
  },
  {
    heading: "Customer Help",
    links: [
      { label: "Contact Us", to: "/contact" },
      { label: "My Cart", to: "/Mycart" },
      { label: "Track Order", to: "/track-order" },
    ],
  },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-ink-950 text-ink-200">
      <div className="section-container grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-2">
          <img
            src="../images/logo.png"
            alt="SM Crackers logo"
            loading="lazy"
            className="h-12 w-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-400">
            Premium Sivakasi fireworks and festive collections, sourced with care. Browse
            our range, build your list, and send an enquiry — our team takes it from there.
          </p>
        </div>

        {/* Link columns */}
        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {col.heading}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.to)}
                    className="text-ink-400 transition-colors hover:text-gold-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Contact
          </h3>
          <div className="space-y-3 text-sm text-ink-400">
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>{BRAND.address.full}</span>
            </p>
            <a
              href={`tel:+91${BRAND.phones.primary}`}
              className="flex items-center gap-2.5 hover:text-gold-300"
            >
              <Phone className="h-4 w-4 shrink-0 text-gold-400" />
              +91 {BRAND.phones.primary}
            </a>
            <a
              href={`https://wa.me/${BRAND.whatsapp.chat}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 hover:text-gold-300"
            >
              <MessageCircle className="h-4 w-4 shrink-0 text-gold-400" />
              WhatsApp Us
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="flex items-center gap-2.5 hover:text-gold-300"
            >
              <Mail className="h-4 w-4 shrink-0 text-gold-400" />
              {BRAND.email}
            </a>
            <a
              href="https://www.instagram.com/sm_crackers_sivakasi?stkn=NmVrNHU3c2llaGxw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 hover:text-gold-300"
            >
              <Instagram className="h-4 w-4 shrink-0 text-gold-400" />
              Instagram
            </a>
          </div>
        </div>

        {/* Legal notice — fills the space beside Contact where the grid wraps */}
        <div className="sm:col-span-2 lg:col-span-4">
          <LegalNotice />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-container flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {BRAND.name}, Sattur — All rights reserved.
          </p>
          <p>Crackers sold subject to standard safety precautions. Use responsibly.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
