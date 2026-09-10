import React from "react";
import { PackageSearch } from "lucide-react";
import Button from "./Button";

export default function EmptyState({
  icon: Icon = PackageSearch,
  title = "Nothing here yet",
  description,
  actionLabel,
  onAction,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center gap-3 rounded-card border border-dashed border-ink-200 bg-white px-6 py-16 text-center ${className}`}
    >
      <div className="rounded-full bg-ink-50 p-4">
        <Icon className="h-8 w-8 text-ink-400" aria-hidden="true" />
      </div>
      <h3 className="font-display text-xl font-semibold text-ink-900">{title}</h3>
      {description && <p className="max-w-sm text-sm text-ink-500">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
