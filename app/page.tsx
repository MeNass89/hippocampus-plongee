import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/ui/Marquee";
import Philosophy from "@/components/sections/Philosophy";
import Formations from "@/components/sections/Formations";
import SortiesFosse from "@/components/sections/SortiesFosse";
import Voyages from "@/components/sections/Voyages";
import Agenda from "@/components/sections/Agenda";
import Gallery from "@/components/sections/Gallery";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "HIPPOCAMPUS | Club de Plongée Sous-Marine — Sissonne",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Philosophy />
      <Formations />
      <SortiesFosse />
      <Voyages />
      <Agenda />
      <Gallery />
      <CTASection />
    </>
  );
}
