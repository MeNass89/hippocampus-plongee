import { type ReactNode } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface PageHeroProps {
  overline: string;
  title: string | ReactNode;
  description: string;
  className?: string;
}

export function PageHero({
  overline,
  title,
  description,
  className = "",
}: PageHeroProps) {
  return (
    <section
      className={`relative flex min-h-[60dvh] items-center justify-center overflow-hidden -mt-24 pt-32 pb-24 md:pb-32 ${className}`}
      style={{ backgroundColor: 'rgba(4, 14, 26, 0.85)' }}
    >
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,25,37,0.5) 0%, rgba(4,14,26,0.85) 100%)",
        }}
      />

      {/* Content — centered, editorial */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 text-center">
        <ScrollReveal animation="fade-up">
          <span className="inline-block rounded-full bg-primary/10 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-6">
            {overline}
          </span>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100}>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] text-on-surface mb-6 max-w-[22ch] mx-auto">
            {title}
          </h1>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={200}>
          <p className="text-lg md:text-xl text-on-surface-variant font-light leading-relaxed max-w-[52ch] mx-auto">
            {description}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default PageHero;
