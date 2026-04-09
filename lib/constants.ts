// Site metadata
export const SITE_METADATA = {
  name: "HIPPOCAMPUS",
  tagline: "Explorez les profondeurs",
  description:
    "Club de plongee sous-marine en France. Formations, baptemes, explorations et sorties en mer pour tous les niveaux.",
  url: "https://hippocampus-plongee.fr",
  locale: "fr-FR",
} as const;

// Navigation links
export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Formations", href: "/#formations" },
  { label: "Agenda", href: "/#agenda" },
  { label: "Galerie", href: "/#galerie" },
  { label: "L'Équipage", href: "/le-club" },
] as const;

// Placeholder content — realistic French, NOT lorem ipsum
export const PLACEHOLDER = {
  hero: {
    headline: "Plongez dans un monde de silence et de lumiere",
    subheadline:
      "Depuis 2010, Hippocampus forme et accompagne les plongeurs de tous niveaux dans la decouverte des fonds marins.",
    cta: "Decouvrir nos formations",
  },

  activities: {
    title: "Nos Activites",
    intro:
      "Du bapteme de plongee aux expeditions techniques, chaque sortie est encadree par des moniteurs brevetes d'Etat.",
    items: [
      {
        title: "Bapteme de plongee",
        description:
          "Votre premiere immersion en milieu naturel, encadree en binome. Accessible des 8 ans.",
      },
      {
        title: "Formations FFESSM",
        description:
          "Niveaux 1 a 4, initiateur, MF1. Cours theoriques en salle et pratique en fosse puis en mer.",
      },
      {
        title: "Explorations",
        description:
          "Sorties hebdomadaires sur les plus beaux sites de la cote : epaves, tombants, grottes sous-marines.",
      },
      {
        title: "Plongee technique",
        description:
          "Nitrox, trimix, recycleur. Pour les plongeurs confirmes qui veulent repousser leurs limites.",
      },
    ],
  },

  club: {
    title: "Le Club",
    intro:
      "Hippocampus, c'est avant tout une equipe soudee et un esprit de convivialite qui fait la difference.",
    stats: [
      { value: "80+", label: "Membres actifs" },
      { value: "15+", label: "Annees d'experience" },
      { value: "12", label: "Moniteurs brevetes" },
      { value: "150+", label: "Sorties par an" },
    ],
    pricing: {
      title: "Tarifs & Adhesion",
      description:
        "L'adhesion annuelle donne acces a toutes les sorties club, aux formations et a l'equipement en pret.",
    },
  },

  contact: {
    title: "Contact",
    intro:
      "Une question sur nos formations ou nos sorties ? L'equipe Hippocampus vous repond sous 48h.",
    address: "Rue de la Gare, 02150 Sissonne",
    email: "contact@hippocampus-plongee.fr",
    phone: "+33 3 23 00 00 00",
  },

  footer: {
    copyright: "HIPPOCAMPUS - Club de plongee sous-marine",
    affiliations: "Club affilie FFESSM - N° 33080XXX",
  },
} as const;
