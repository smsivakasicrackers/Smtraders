import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Whatsapp = () => {
  return (
    <a
      href="https://wa.me/+918903359989"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center
                 rounded-full bg-emerald-500 text-white shadow-premium
                 transition-transform duration-300 hover:scale-110 hover:bg-emerald-600
                 sm:bottom-6 sm:right-6"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6" />
    </a>
  );
};

export default Whatsapp;
