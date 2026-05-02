import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

export function CTASection() {
  return (
    <section
      className="py-16 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden border-t border-on-surface/[0.06]"
      style={{ backgroundColor: 'rgba(4, 14, 26, 0.85)' }}
    >
      {/* Decorative blur */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-[1400px]">
        <ScrollReveal animation="fade-up">
          {/* Card-in-card frame pattern wrapping entire CTA */}
          <div className="card-frame" style={{ borderRadius: "2.5rem", boxShadow: "0 0 0 1px rgba(213, 228, 247, 0.05)" }}>
            <div
              className="overflow-hidden px-8 py-20 text-center md:px-16 md:py-28"
              style={{
                borderRadius: "calc(2.5rem - 0.375rem)",
                background: "linear-gradient(145deg, rgba(14,25,37,0.8) 0%, rgba(4,14,26,0.6) 50%, rgba(10,21,32,0.8) 100%)",
              }}
            >
              <blockquote className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold italic text-on-surface leading-tight mb-8 tracking-[-0.02em] max-w-2xl mx-auto">
                &laquo;&nbsp;La mer est le vaste r&eacute;servoir de la nature. La mer donnera &agrave; chaque homme des raisons de r&ecirc;ver.&nbsp;&raquo;
              </blockquote>

              <p className="text-on-surface-variant font-light text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
                Rejoignez l&apos;&eacute;quipage. Que vous r&ecirc;viez de votre
                premi&egrave;re bulle ou de votre centi&egrave;me &eacute;pave, Hippocampus vous attend.
              </p>

              <Button href="/le-club#contact" size="lg" magnetic={true}>
                Devenir Membre
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default CTASection;
