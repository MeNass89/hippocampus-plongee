import { type ReactNode, memo } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Enable hover lift + glow effect */
  hover?: boolean;
  /** Use the card-in-card frame pattern instead of glass */
  frame?: boolean;
  /** HTML element to render as */
  as?: "div" | "article" | "section";
}

export function GlassCard({
  children,
  className = "",
  hover = true,
  frame = false,
  as: Tag = "div",
}: GlassCardProps) {
  if (frame) {
    return (
      <Tag className={`card-frame ${className}`}>
        <div className="card-frame-inner">{children}</div>
      </Tag>
    );
  }

  return (
    <Tag
      className={[
        // Base glass surface with inner border refraction
        "glass-panel rounded-xl border border-outline-variant/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_4px_16px_-4px_rgba(4,14,26,0.4)]",
        // Transition
        "transition-all duration-500 ease-expo",
        // Hover effects with spotlight glow
        hover &&
          "hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_8px_32px_rgba(4,14,26,0.5),0_0_20px_rgba(56,217,220,0.08)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}

export default memo(GlassCard);
