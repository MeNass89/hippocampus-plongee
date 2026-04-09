import { memo } from "react";

interface SectionTitleProps {
  /** Small uppercase text above the heading */
  overline: string;
  /** Main heading text */
  title: string;
  /** Optional paragraph below the heading */
  description?: string;
  /** Text alignment */
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  overline,
  title,
  description,
  align = "left",
  className = "",
}: SectionTitleProps) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
        {overline}
      </span>
      <h2
        className={`font-headline text-4xl md:text-5xl font-bold text-on-surface tracking-[-0.02em] leading-tight${
          description ? " mb-6" : ""
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-on-surface-variant max-w-2xl font-light leading-relaxed${
            centered ? " mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default memo(SectionTitle);
