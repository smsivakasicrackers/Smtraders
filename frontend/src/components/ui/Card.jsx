import React from "react";

/**
 * Generic surface card. Use `interactive` for cards that respond to
 * hover/click (product cards, category tiles) and `padding` to control
 * the internal spacing since some callers (image cards) need padding: "none".
 */
export default function Card({
  as: Tag = "div",
  interactive = false,
  padding = "md",
  className = "",
  children,
  ...rest
}) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const classes = [
    "card-surface",
    paddings[padding] ?? paddings.md,
    interactive &&
      "transition duration-200 hover:-translate-y-0.5 hover:shadow-premium",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
