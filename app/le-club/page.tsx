import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Marquee from "@/components/ui/Marquee";
import ClubHistory from "@/components/sections/ClubHistory";
import Team from "@/components/sections/Team";
import FFESSMAffiliation from "@/components/sections/FFESSMAffiliation";
import Pricing from "@/components/sections/Pricing";
import Values from "@/components/sections/Values";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "L'\u00c9quipage",
  description:
    "D\u00e9couvrez l'\u00e9quipe, l'histoire et les tarifs du club de plong\u00e9e Hippocampus \u00e0 Sissonne. Rejoignez un club convivial affili\u00e9 FFESSM depuis 2010.",
};

export default function LeClubPage() {
  return (
    <>
      <PageHero
        overline="L'&Eacute;quipage"
        title={
          <>
            Notre{" "}
            <span className="italic text-primary">&Eacute;quipage.</span>
          </>
        }
        description="D&eacute;couvrez Vivien et C&eacute;line, les fondateurs d&apos;Hippocampus. Leur passion pour la plong&eacute;e et leur exigence technique font vivre le club depuis 2010."
      />
      <Marquee words={["\u00c9quipage", "Formation", "S\u00e9curit\u00e9", "Partage", "Technique", "Passion", "Moniteurs", "FFESSM"]} />
      <Team />
      <ClubHistory />
      <FFESSMAffiliation />
      <Pricing />
      <Values />
      <ContactForm />
    </>
  );
}
