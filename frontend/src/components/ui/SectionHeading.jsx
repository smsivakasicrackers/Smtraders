import React from "react";

/**
 * Eyebrow + heading + subcopy pattern reused across Home, About, Contact,
 * and other marketing-style sections.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
  className = "",
}) {
  const alignment = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow && (
        <span
          className={`text-xs font-bold uppercase tracking-[0.2em] ${
            light ? "text-gold-300" : "text-crimson-600"
          }`}
        >
          {eyebrow}
        </span>
      )}
      {title && (
        <h2
          className={`font-display text-3xl font-semibold leading-tight sm:text-4xl ${
            light ? "text-white" : "text-ink-900"
          }`}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`text-base leading-relaxed ${light ? "text-ink-200" : "text-ink-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
