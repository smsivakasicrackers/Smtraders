import React from "react";
import { SectionHeading } from "./ui";

const testimonials = [
  {
    name: "Mohamed Ibrahim",
    text: "Excellent service and top-quality crackers! Fast delivery and safe packaging. Highly recommend SM Crackers for festive shopping.",
  },
  {
    name: "Rajesh",
    text: "Fantastic experience — great variety and prices. Their fireworks made our Diwali truly memorable!",
  },
  {
    name: "Ashley Jude",
    text: "Beautiful and colorful fireworks. Very professional and friendly service. Would definitely buy again.",
  },
  {
    name: "Eswara Prakash",
    text: "Quick response and prompt delivery. The crackers were vibrant and safely packed. Trusted brand!",
  },
  {
    name: "Jawahar",
    text: "SM Crackers has the best customer support. They guided me in choosing the right combo boxes for my family.",
  },
  {
    name: "Suresh",
    text: "Affordable, safe, and amazing quality! The entire process was smooth from order to delivery.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="overflow-hidden bg-ink-950 py-16 sm:py-20">
      <div className="section-container">
        <SectionHeading
          eyebrow="Customer Love"
          title="What Our Customers Say"
          subtitle="Here's what our happy customers have to say about their experience with SM Crackers."
          align="center"
          light
          className="mx-auto mb-12"
        />
      </div>

      {/* Scrolling Container */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll-slow gap-6 md:gap-8">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="w-[280px] flex-shrink-0 rounded-card border border-white/10 bg-ink-900 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow sm:w-[320px] md:w-[350px]"
            >
              <p className="mb-4 text-sm italic leading-relaxed text-ink-200 md:text-base">
                &ldquo;{t.text}&rdquo;
              </p>
              <h4 className="font-display text-base font-semibold text-gold-400 md:text-lg">
                {t.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
