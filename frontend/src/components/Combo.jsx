import React from "react";
import img1 from "../combo/SM-1.jpg";
import img2 from "../combo/SM-2.jpg";
import img3 from "../combo/SM-3.jpg";
import img4 from "../combo/SM-4.jpg";
import { SectionHeading } from "./ui";

const Combo = () => {
  const combos = [
    { id: 1, img: img1, alt: "SM Crackers combo pack 1" },
    { id: 2, img: img2, alt: "SM Crackers combo pack 2" },
    { id: 3, img: img3, alt: "SM Crackers combo pack 3" },
    { id: 4, img: img4, alt: "SM Crackers combo pack 4" },
  ];

  return (
    <section className="section-container py-16 sm:py-20">
      <SectionHeading
        eyebrow="Curated Combos"
        title="Our Combo Packs"
        subtitle="Ready-made assortments that bundle our festive favorites together, so you can celebrate without the guesswork."
        align="center"
        className="mx-auto mb-12"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {combos.map((combo) => (
          <div
            key={combo.id}
            className="group overflow-hidden rounded-card border border-ink-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
          >
            <div className="aspect-square w-full overflow-hidden">
              <img
                src={combo.img}
                alt={combo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Combo;
