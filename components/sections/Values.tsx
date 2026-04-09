import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import Image from "next/image";

const VALUES = [
  {
    number: "01",
    title: "Sécurité Absolue",
    description:
      "Aucune sortie sans briefing complet, aucun palier négligé. La rigueur est notre première liberté.",
    image: "/assets/photos/value-security.webp",
    imageAlt: "Briefing de sécurité avant une plongée",
  },
  {
    number: "02",
    title: "Esprit Club",
    description:
      "Partager un après-plongée, accueillir les nouveaux, transmettre son expérience — l'humain est au centre.",
    image: "/assets/photos/value-community.webp",
    imageAlt: "Plongeurs partageant un moment de convivialité",
  },
  {
    number: "03",
    title: "Respect du Milieu",
    description:
      "La plongée enseigne l'humilité face à l'océan, la confiance en son binôme et le respect d'un écosystème fragile.",
    image: "/assets/photos/value-environment.webp",
    imageAlt: "Récif corallien",
  },
];

export function Values() {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: 'rgba(2, 10, 20, 0.85)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section heading */}
        <ScrollReveal animation="fade-up">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Nos Valeurs
          </span>
          <h2 className="font-headline text-4xl md:text-5xl font-light text-on-surface tracking-tight leading-[1.1] max-w-[22ch] mb-16">
            Notre Philosophie
          </h2>
        </ScrollReveal>

        {/* Numbered value rows */}
        <div>
          {VALUES.map((value, i) => (
            <ScrollReveal key={value.number} animation="fade-up" delay={i * 100}>
              <div className="border-t border-on-surface/[0.06] py-10 md:py-14 transition-colors duration-500 ease-expo hover:bg-on-surface/[0.02]">
                <div className="grid gap-6 md:grid-cols-12 md:items-center md:gap-10">
                  {/* Image */}
                  <div className="md:col-span-2 flex justify-center">
                    <div className="flex-shrink-0 rounded-full p-1 ring-1 ring-on-surface/10" style={{ backgroundColor: 'rgba(213, 228, 247, 0.03)' }}>
                      <Image
                        src={value.image}
                        alt={value.imageAlt}
                        width={64}
                        height={64}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Number + Title */}
                  <div className="md:col-span-3">
                    <p className="font-headline text-xl text-on-surface/40 mb-1">
                      {value.number}
                    </p>
                    <h3 className="font-headline text-2xl font-light tracking-tight text-on-surface md:text-3xl">
                      {value.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-7">
                    <p className="max-w-[55ch] text-base font-light leading-relaxed text-on-surface-variant">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
          {/* Bottom border */}
          <div className="border-t border-on-surface/[0.06]" />
        </div>

        {/* CTA in card-frame */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="card-frame mt-20">
            <div
              className="card-frame-inner px-8 py-16 md:px-16 md:py-20 text-center"
              style={{
                background: "linear-gradient(145deg, rgba(14,25,37,1) 0%, rgba(4,14,26,1) 50%, rgba(0,83,84,0.15) 100%)",
              }}
            >
              <h3 className="font-headline text-2xl md:text-3xl font-light text-on-surface leading-tight tracking-tight mb-3">
                Prêt à plonger ?
              </h3>
              <p className="text-on-surface-variant font-light mb-8 max-w-md mx-auto">
                Rejoignez l&apos;&eacute;quipage et d&eacute;couvrez un nouveau monde.
              </p>
              <Button variant="primary" href="/le-club#contact" magnetic={true} size="lg">
                Nous contacter
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default Values;
