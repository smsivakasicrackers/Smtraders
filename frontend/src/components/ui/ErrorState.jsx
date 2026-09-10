import React from "react";
import { AlertTriangle } from "lucide-react";
import Button from "./Button";

export default function ErrorState({
  title = "Something went wrong",
  description = "Please try again in a moment.",
  onRetry,
  className = "",
}) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center gap-3 rounded-card border border-red-100 bg-red-50/60 px-6 py-16 text-center ${className}`}
    >
      <div className="rounded-full bg-red-100 p-4">
        <AlertTriangle className="h-8 w-8 text-red-600" aria-hidden="true" />
      </div>
      <h3 className="font-display text-xl font-semibold text-ink-900">{title}</h3>
      <p className="max-w-sm text-sm text-ink-500">{description}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} className="mt-2">
          Try again
        </Button>
      )}
    </div>
  );
}
