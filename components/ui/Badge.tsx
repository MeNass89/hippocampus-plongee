import { type ReactNode, memo } from "react";

interface BadgeProps {
  children: ReactNode;
  /** Visual variant */
  variant?: "primary" | "tertiary" | "outline";
  className?: string;
}

const VARIANT_CLASSES: Record<NonNullable<BadgeProps["variant"]>, string> = {
  primary: "bg-primary/20 text-primary border border-primary/30",
  tertiary:
    "bg-tertiary-container/20 text-tertiary border border-tertiary-container/30",
  outline: "border border-outline-variant/30 text-secondary",
};

export function Badge({
  children,
  variant = "primary",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-label uppercase tracking-widest inline-block ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export default memo(Badge);
