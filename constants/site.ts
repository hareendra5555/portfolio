import type { NavGroup, NavItem } from "@/types/nav";

import { ROUTES } from "./routes";
import { asset } from "./url";
import { getBaseUrl } from "./url";
import { FULL_NAME, NAME } from "./user";

const baseUrl = getBaseUrl();

export const SITE = {
  AUTHOR: {
    AVATAR: asset("/avatar.svg"),
    FULL_NAME,
    NAME,
  },
  DESCRIPTION: {
    LONG: "Software engineer based in Gainesville, Florida. I build fast, reliable backend systems — async APIs, event-driven pipelines, and cloud-native services — and I am now focused on agentic AI. M.S. in Computer Science from the University of Florida.",
    SHORT:
      "Software engineer building fast, reliable backend systems, clean APIs, and cloud-native services — now focused on agentic AI.",
  },
  KEYWORDS: [
    "Hareendra Nerusu",
    "Hareendra Sri Nag Nerusu",
    "Software Engineer",
    "Backend Engineer",
    "Agentic AI",
    "FastAPI",
    "Python",
    "Go",
    "AWS",
    "Kubernetes",
    "Distributed Systems",
    "University of Florida",
    "Portfolio",
  ],
  NAME,
  URL: baseUrl,
} as const;

export const META_THEME_COLORS = {
  dark: "#0a0a0a",
  light: "#ffffff",
};

export const UTM_PARAMS = {
  utm_source: new URL(baseUrl).hostname,
};

export const NAV_STANDALONE: NavItem[] = [
  {
    href: ROUTES.HOME,
    id: "home",
    label: "home",
  },
  {
    href: ROUTES.CONTACT,
    id: "contact",
    label: "contact",
  },
];

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "work",
    items: [
      {
        href: ROUTES.PROJECTS,
        id: "projects",
        label: "projects",
      },
      {
        href: ROUTES.EXPERIENCES,
        id: "experiences",
        label: "experience",
      },
      {
        href: ROUTES.CRAFTS,
        id: "crafts",
        label: "crafts",
      },
      {
        href: ROUTES.USES,
        id: "uses",
        label: "uses",
      },
    ],
    label: "work",
  },
  {
    id: "extras",
    items: [
      {
        href: ROUTES.EDUCATION,
        id: "education",
        label: "education",
      },
      {
        href: ROUTES.PUBLICATIONS,
        id: "publications",
        label: "publications",
      },
    ],
    label: "extras",
  },
];
