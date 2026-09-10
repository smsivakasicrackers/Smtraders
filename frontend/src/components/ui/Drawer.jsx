import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/**
 * Slide-out panel used for the mobile nav menu and the mobile filter panel.
 * `side` controls which edge it slides in from.
 */
export default function Drawer({ open, onClose, title, side = "right", children }) {
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const sideClasses = side === "left" ? "left-0 animate-slide-up" : "right-0 animate-slide-up";

  return createPortal(
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`absolute top-0 h-full w-full max-w-sm overflow-y-auto bg-white shadow-premium ${sideClasses}`}
      >
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-ink-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-ink-500 hover:bg-ink-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}
