import React from "react";
import { Loader2 } from "lucide-react";

const VARIANTS = {
  primary:
    "bg-crimson-600 text-white shadow-soft hover:bg-crimson-700 active:bg-crimson-800 disabled:bg-ink-200 disabled:text-ink-400",
  secondary:
    "bg-white text-ink-800 border border-ink-200 hover:border-crimson-300 hover:text-crimson-700 disabled:text-ink-300",
  ghost:
    "bg-transparent text-ink-700 hover:bg-ink-100 disabled:text-ink-300",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-ink-200 disabled:text-ink-400",
  gold:
    "bg-gold-500 text-ink-900 shadow-soft hover:bg-gold-600 disabled:bg-ink-200 disabled:text-ink-400",
};

const SIZES = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

/**
 * Shared button primitive. Renders a native <button> unless `href` is
 * passed, in which case it renders an <a> with the same visual treatment.
 */
const Button = React.forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    icon: Icon,
    iconPosition = "left",
    href,
    className = "",
    children,
    ...rest
  },
  ref
) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
    "disabled:cursor-not-allowed",
    VARIANTS[variant] || VARIANTS.primary,
    SIZES[size] || SIZES.md,
    className,
  ].join(" ");

  const content = (
    <>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        Icon && iconPosition === "left" && <Icon className="h-4 w-4" aria-hidden="true" />
      )}
      {children}
      {!loading && Icon && iconPosition === "right" && (
        <Icon className="h-4 w-4" aria-hidden="true" />
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={classes}
      {...rest}
    >
      {content}
    </button>
  );
});

export default Button;
