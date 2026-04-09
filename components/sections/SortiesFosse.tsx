"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

const BULLET_POINTS = [
  "Profondeur maximale de 34,5 mètres",
  "Encadrement personnalisé par nos moniteurs certifiés",
] as const;

export function SortiesFosse() {
  return (
    <section className="py-16 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden border-t border-on-surface/[0.06]" style={{ backgroundColor: 'rgba(4, 14, 26, 0.85)' }}>
      {/* Decorative blur */}
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left — Text */}
        <div>
          <ScrollReveal animation="fade-up">
            <p className="font-label text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">
              Entra&icirc;nement
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface mb-6 tracking-[-0.02em] leading-tight">
              Sorties en Fosse : Nemo 33
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <p className="text-on-surface-variant font-light leading-relaxed mb-8 max-w-xl">
              Nos sorties r&eacute;guli&egrave;res &agrave; Nemo 33, la fosse de plong&eacute;e
              la plus profonde d&apos;Europe situ&eacute;e &agrave; Bruxelles en Belgique,
              offrent un cadre id&eacute;al pour perfectionner vos comp&eacute;tences.
              34,5 m&egrave;tres de profondeur, eau cristalline et conditions
              id&eacute;ales pour un entra&icirc;nement progressif toute l&apos;ann&eacute;e.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={300}>
            <ul className="space-y-3 mb-10">
              {BULLET_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <span className="text-primary text-sm font-bold shrink-0">&#10003;</span>
                  <span className="text-on-surface-variant font-light text-sm">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={400}>
            <Button variant="outline" href="/#agenda" magnetic={true}>
              Voir le calendrier
            </Button>
          </ScrollReveal>
        </div>

        {/* Right — Visual in card-frame */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="card-frame">
            <div className="card-frame-inner">
              <div className="relative">
                {/* Nemo 33 image with gradient fallback */}
                <div
                  className="aspect-[3/4]"
                  style={{
                    background:
                      "linear-gradient(135deg, #0a2540 0%, #1d2b39 50%, #13212e 100%)",
                  }}
                >
                  <img
                    src="/assets/photos/nemo33-generated.webp"
                    alt="Fosse de plongée Nemo 33"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(6,20,34,0.8) 0%, transparent 60%)",
                  }}
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default SortiesFosse;
