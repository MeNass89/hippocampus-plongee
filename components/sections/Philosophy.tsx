import ScrollReveal from "@/components/ui/ScrollReveal";

export function Philosophy() {
  return (
    <section className="py-16 md:py-32 relative overflow-hidden border-t border-on-surface/[0.06]" style={{ backgroundColor: 'rgba(10, 21, 32, 0.85)' }}>
      {/* Decorative blur */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left column — Text */}
          <ScrollReveal animation="fade-up">
            <div>
              <p className="font-label text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">
                Notre Approche
              </p>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface mb-8 leading-tight tracking-[-0.02em]">
                Une Expérience
                <br />
                <span className="italic text-primary">Abyssale</span>
              </h2>

              <p className="text-on-surface-variant font-light leading-relaxed mb-6 max-w-prose">
                Chez Hippocampus, la plong&eacute;e n&apos;est pas un simple sport — c&apos;est un art
                de vivre. Chaque descente est une invitation au silence, &agrave;
                l&apos;apesanteur, &agrave; la contemplation d&apos;un monde que seuls les initi&eacute;s
                connaissent. Nos moniteurs, brevet&eacute;s d&apos;&Eacute;tat et form&eacute;s depuis
                des ann&eacute;es, transmettent bien plus qu&apos;une technique : une
                philosophie du respect des profondeurs et de la biodiversit&eacute; marine.
              </p>

              <p className="text-on-surface-variant font-light leading-relaxed mb-10 max-w-prose">
                La s&eacute;curit&eacute; n&apos;est jamais un frein &agrave; l&apos;&eacute;merveillement. Au contraire,
                c&apos;est elle qui lib&egrave;re : ma&icirc;triser ses paliers, conna&icirc;tre ses
                limites, comprendre et respecter la mer — voil&agrave; ce qui transforme un plongeur
                en explorateur. Depuis 2010, cette exigence guide chacune de nos
                formations, chacune de nos sorties.
              </p>

              {/* Decorative line + label */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-primary" />
                <span className="text-xs font-label uppercase tracking-[0.3em] text-outline">
                  Fond&eacute; en 2010 &agrave; Sissonne
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right column — Image in card-frame + stat */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="relative">
              {/* Card-in-card frame pattern */}
              <div className="card-frame">
                <div className="card-frame-inner">
                  <div className="aspect-[4/5]">
                    <img
                      src="/assets/photos/philosophy.webp"
                      alt="Hippocampe en macro — philosophie du club"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default Philosophy;
