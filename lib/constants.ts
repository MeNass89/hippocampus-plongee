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
  { label: "L'\u00C9quipage", href: "/le-club" },
] as const;
