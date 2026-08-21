import { LINK } from "@/constants/links";
import type { Contact } from "@/types/contacts";

export const CONTACTS = [
  {
    icon: "github",
    link: {
      display: "@hareendra5555",
      url: LINK.GITHUB,
    },
    title: "GitHub",
  },
  {
    icon: "linkedin",
    link: {
      display: "in/hareendrasrinag",
      url: LINK.LINKEDIN,
    },
    title: "LinkedIn",
  },
  {
    icon: "leetcode",
    link: {
      display: "u/hareendra21",
      url: LINK.LEETCODE,
    },
    title: "LeetCode",
  },
  {
    icon: "email",
    link: {
      display: LINK.EMAIL,
      url: `mailto:${LINK.EMAIL}`,
    },
    title: "Email",
  },
] as const satisfies readonly Contact[];
