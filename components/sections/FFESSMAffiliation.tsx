import ScrollReveal from "@/components/ui/ScrollReveal";

const STATS = [
  { value: "95%", label: "R\u00e9ussite Examens" },
  { value: "BEES", label: "Moniteurs Dipl\u00f4m\u00e9s" },
  { value: "02150", label: "Base de Sissonne" },
  { value: "CMAS", label: "Reconnaissance Mondiale" },
] as const;

const CHECKMARKS = [
  "Validation CMAS internationale",
  "Assurance incluse dans l\u2019adh\u00e9sion",
] as const;

export function FFESSMAffiliation() {
  return (
    <section className="py-16 md:py-32" style={{ backgroundColor: 'rgba(2, 10, 20, 0.85)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Outer card-frame wrapper */}
        <div className="card-frame">
          <div className="card-frame-inner p-6 md:p-16 bg-surface-container-low relative">
            {/* Decorative blur circles */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left column */}
              <ScrollReveal animation="fade-up">
                <div>
                  {/* FFESSM badge placeholder */}
                  <div className="inline-flex items-center gap-3 mb-8 bg-surface-container-highest/40 border border-outline-variant/10 rounded-xl px-4 py-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-on-primary"
                      style={{
                        background:
                          "linear-gradient(135deg, #47eaed, #00ced1)",
                      }}
                    >
                      FF
                    </div>
                    <span className="text-xs font-label uppercase tracking-[0.2em] text-on-surface-variant">
                      Club Affili&eacute; N&deg; 33080XXX
                    </span>
                  </div>

                  <p className="font-label text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">
                    Affiliation FFESSM
                  </p>
                  <h2 className="font-headline text-4xl md:text-5xl font-light text-on-surface mb-6 leading-[1.1] tracking-tight">
                    La Garantie du
                    <br />
                    <span className="italic text-primary">Dipl&ocirc;me Fran&ccedil;ais</span>
                  </h2>
                  <p className="text-on-surface-variant font-light leading-relaxed mb-8 max-w-[55ch]">
                    Hippocampus est affili&eacute; &agrave; la F&eacute;d&eacute;ration Fran&ccedil;aise d&apos;&Eacute;tudes et
                    de Sports Sous-Marins. Nos formations d&eacute;livrent des
                    certifications reconnues en France et &agrave; l&apos;international via la
                    CMAS, ouvrant les portes de tous les centres de plong&eacute;e du
                    monde.
                  </p>

                  {/* Checkmarks */}
                  <ul className="space-y-3">
                    {CHECKMARKS.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary text-xs">&#10003;</span>
                        </span>
                        <span className="text-on-surface-variant text-sm">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* Right column — 2x2 stat grid with card-frames */}
              <ScrollReveal animation="fade-up" delay={200}>
                <div className="grid grid-cols-2 gap-4">
                  {STATS.map((stat, i) => (
                    <ScrollReveal key={stat.label} animation="fade-up" delay={100 + i * 80}>
                      <div className="card-frame">
                        <div className="card-frame-inner bg-surface-container p-6 md:p-8 flex flex-col items-center text-center">
                          <p className="font-headline text-3xl md:text-4xl font-light text-primary italic tracking-tight tabular-nums">
                            {stat.value}
                          </p>
                          <p className="text-[11px] font-label uppercase tracking-[0.2em] text-on-surface-variant/50 mt-2">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FFESSMAffiliation;
