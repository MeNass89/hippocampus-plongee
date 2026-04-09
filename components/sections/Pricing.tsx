import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

const CheckIcon = () => (
  <svg className="w-4 h-4 text-primary flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


export function Pricing() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: 'rgba(4, 14, 26, 0.85)' }}>
      {/* Decorative blur circle */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section title */}
        <ScrollReveal animation="fade-up">
          <SectionTitle
            overline="Tarifs & Adh&eacute;sion"
            title="Rejoindre le Club"
            description="L'adh&eacute;sion donne acc&egrave;s aux entra&icirc;nements hebdomadaires, aux sorties club et au mat&eacute;riel en pr&ecirc;t."
            align="center"
            className="mb-16"
          />
        </ScrollReveal>

        {/* 2 pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1 — Adh&eacute;sion Annuelle */}
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="card-frame h-full">
              <div className="card-frame-inner bg-surface-container p-8 md:p-10 h-full flex flex-col">
                <h3 className="font-headline text-2xl font-light text-on-surface mb-2 leading-tight">
                  Adh&eacute;sion Annuelle
                </h3>
                <p className="text-sm text-on-surface-variant font-light mb-8">
                  Pour les plongeurs autonomes
                </p>

                {/* Benefits */}
                <ul className="flex flex-col gap-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-on-surface-variant text-sm leading-relaxed">
                    <CheckIcon />
                    Cours hebdomadaires
                  </li>
                  <li className="flex items-center gap-3 text-on-surface-variant text-sm leading-relaxed">
                    <CheckIcon />
                    Licence FFESSM incluse
                  </li>
                  <li className="flex items-center gap-3 text-on-surface-variant text-sm leading-relaxed">
                    <CheckIcon />
                    Pr&ecirc;t de mat&eacute;riel
                  </li>
                </ul>

                {/* CTA */}
                <Button variant="primary" href="/contact" magnetic={true} className="text-center w-full">
                  Nous contacter
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 — Pack Formation */}
          <ScrollReveal animation="fade-up" delay={250}>
            <div className="card-frame h-full">
              <div className="card-frame-inner bg-surface-container p-8 md:p-10 h-full flex flex-col">
                <h3 className="font-headline text-2xl font-light text-on-surface mb-2 leading-tight">
                  Pack Formation
                </h3>
                <p className="text-sm text-on-surface-variant font-light mb-8">
                  Niveau 1 &agrave; Niveau 3
                </p>

                {/* Benefits */}
                <ul className="flex flex-col gap-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-on-surface-variant text-sm leading-relaxed">
                    <CheckIcon />
                    Tout inclus
                  </li>
                  <li className="flex items-center gap-3 text-on-surface-variant text-sm leading-relaxed">
                    <CheckIcon />
                    Carnet de plong&eacute;e offert
                  </li>
                  <li className="flex items-center gap-3 text-on-surface-variant text-sm leading-relaxed">
                    <CheckIcon />
                    6 sorties milieu naturel
                  </li>
                </ul>

                {/* CTA */}
                <Button variant="primary" href="/contact" magnetic={true} className="text-center w-full">
                  Nous contacter
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
