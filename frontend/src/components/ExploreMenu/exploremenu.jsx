import React from "react";
import { FaStar, FaGift } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { LuSparkles } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { SectionHeading } from "../ui";

const Exploremenu = () => {
  const navigate = useNavigate();
  const menuItems = [
    {
      name: "Sparklers",
      color: "bg-ember-50",
      iconColor: "text-ember-600",
      icon: <FaStar className="text-3xl" />,
    },
    {
      name: "Flower pot",
      color: "bg-gold-50",
      iconColor: "text-gold-600",
      icon: <BsSunFill className="text-3xl" />,
    },
    {
      name: "Sky shot rider",
      color: "bg-crimson-50",
      iconColor: "text-crimson-600",
      icon: <LuSparkles className="text-3xl" />,
    },
    {
      name: "Gift box",
      color: "bg-paper-200",
      iconColor: "text-ink-700",
      icon: <FaGift className="text-3xl" />,
    },
  ];

  const goToCategory = (name) => navigate(`/products?category=${encodeURIComponent(name)}`);

  return (
    <section className="section-container py-16 sm:py-20">
      {/* Heading */}
      <SectionHeading
        eyebrow="Shop by Category"
        title="Discover Our Sparkling Range"
        subtitle="Explore our vibrant collection of Diwali crackers, designed to light up your celebrations with dazzling displays and festive joy!"
        align="center"
        className="mx-auto mb-12"
      />

      {/* Grid */}
      <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-4">
        {menuItems.map((item) => (
          <div
            key={item.name}
            role="button"
            tabIndex={0}
            onClick={() => goToCategory(item.name)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                goToCategory(item.name);
              }
            }}
            className={`${item.color} group flex cursor-pointer flex-col items-center justify-center rounded-card border border-ink-100/60 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 sm:p-8`}
          >
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-soft transition-transform duration-300 group-hover:scale-110 ${item.iconColor}`}
            >
              {item.icon}
            </div>
            <p className="mt-4 text-center font-display text-base font-semibold text-ink-900 sm:text-lg">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Exploremenu;
