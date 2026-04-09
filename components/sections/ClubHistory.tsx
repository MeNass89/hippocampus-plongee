import ScrollReveal from "@/components/ui/ScrollReveal";

export function ClubHistory() {
  return (
    <section className="py-16 md:py-32" style={{ backgroundColor: 'rgba(10, 21, 32, 0.85)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left column — Image in card-frame */}
          <ScrollReveal animation="fade-up">
            <div className="card-frame">
              <div className="card-frame-inner">
                <div
                  className="aspect-[4/3] grayscale hover:grayscale-0 transition-all duration-700 ease-expo"
                  style={{
                    background:
                      "linear-gradient(160deg, #0a2540 0%, #061422 40%, #00ced1 140%)",
                  }}
                >
                  <div className="flex items-end h-full p-8">
                    <span className="text-xs font-label uppercase tracking-[0.3em] text-outline/40">
                      Photo &mdash; Club Hippocampus, Sissonne
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right column — Text */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div>
              <h2 className="font-headline text-4xl font-light text-on-surface mb-8 leading-[1.1] tracking-tight">
                Le Club{" "}
                <span className="italic text-primary">Hippocampus</span>
              </h2>

              <p className="text-on-surface-variant font-light leading-relaxed mb-6 max-w-[55ch]">
                Fond&eacute; par Vivien Dambreville, Moniteur F&eacute;d&eacute;ral titulaire du
                BEES2 &mdash; la plus haute certification d&apos;enseignement de la
                plong&eacute;e en France &mdash;, le club Hippocampus propose un programme
                complet&nbsp;: entra&icirc;nements hebdomadaires en piscine, plong&eacute;es en
                milieu naturel et voyages de plong&eacute;e &agrave; l&apos;international.
              </p>

              <p className="text-on-surface-variant font-light leading-relaxed mb-10 max-w-[55ch]">
                Bas&eacute; &agrave; Sissonne dans l&apos;Aisne, le club s&apos;entra&icirc;ne &agrave; Nemo 33
                &agrave; Bruxelles &mdash; la fosse la plus profonde d&apos;Europe avec ses
                34,5&nbsp;m&egrave;tres &mdash; pour les sessions techniques. Les membres
                profitent &eacute;galement de voyages annuels (Guadeloupe, Mer Rouge,
                Seychelles) pour diversifier leur exp&eacute;rience en milieux marins
                vari&eacute;s. L&apos;entra&icirc;nement r&eacute;gulier chaque semaine garantit une
                progression constante pour tous les niveaux.
              </p>

              {/* Stats row — border-t divider above */}
              <div className="flex gap-10 md:gap-16 border-t border-on-surface/[0.06] pt-8 md:pt-10">
                <div>
                  <p className="font-headline text-4xl md:text-5xl font-light tracking-tight text-primary tabular-nums">
                    15+
                  </p>
                  <p className="text-[11px] font-label uppercase tracking-[0.2em] text-on-surface-variant/50 mt-2">
                    Ann&eacute;es d&apos;Exp&eacute;rience
                  </p>
                </div>
                <div>
                  <p className="font-headline text-4xl md:text-5xl font-light tracking-tight text-primary tabular-nums">
                    80+
                  </p>
                  <p className="text-[11px] font-label uppercase tracking-[0.2em] text-on-surface-variant/50 mt-2">
                    Membres Actifs
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default ClubHistory;
