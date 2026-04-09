"use client";

import {
  type ReactNode,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  useRef,
  useCallback,
} from "react";

interface ButtonBaseProps {
  children: ReactNode;
  /** Visual variant */
  variant?: "primary" | "glass" | "outline";
  /** Button size */
  size?: "sm" | "md" | "lg";
  /** If provided, renders as an anchor tag */
  href?: string;
  /** Enable magnetic mouse-follow effect */
  magnetic?: boolean;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;

type ButtonAsAnchor = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps>;

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const VARIANT_CLASSES: Record<NonNullable<ButtonBaseProps["variant"]>, string> =
  {
    primary: [
      "bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold",
      "hover:shadow-[0_0_20px_rgba(71,234,237,0.4)] hover:-translate-y-px",
    ].join(" "),
    glass: [
      "bg-surface-container-high border border-outline-variant/20 text-on-surface",
      "hover:bg-primary hover:text-on-primary hover:shadow-[0_0_20px_rgba(71,234,237,0.3)]",
    ].join(" "),
    outline: [
      "border border-outline-variant/30 text-on-surface",
      "hover:bg-surface-container hover:border-primary/30 hover:shadow-[0_0_16px_rgba(56,217,220,0.08)]",
    ].join(" "),
  };

const SIZE_CLASSES: Record<NonNullable<ButtonBaseProps["size"]>, string> = {
  sm: "px-6 py-2 text-xs",
  md: "px-8 py-3 text-sm",
  lg: "px-12 py-4 text-base",
};

const EXPO_EASING = "cubic-bezier(0.32, 0.72, 0, 1)";

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  magnetic = false,
  className = "",
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!magnetic || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      ref.current.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
      ref.current.style.transition = "transform 0.15s ease-out";
    },
    [magnetic]
  );

  const handleMouseLeave = useCallback(() => {
    if (!magnetic || !ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
    ref.current.style.transition = `transform 0.7s ${EXPO_EASING}`;
  }, [magnetic]);

  const classes = [
    "inline-block uppercase tracking-[0.2em] transition-all duration-500 ease-expo rounded-xl",
    "active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ].join(" ");

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

export default Button;
