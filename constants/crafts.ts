import type { Craft } from "@/types/crafts";

const LIQUID_GLASS_SITE = "https://hareendra5555.github.io/";

export const CRAFTS = [
  {
    category: "SVG",
    description:
      "Real lensing on a glass panel: fractal-noise turbulence feeding a displacement map, so edges bend instead of blurring.",
    links: {
      demo: LIQUID_GLASS_SITE,
    },
    slug: "liquid-glass",
    title: "Liquid Glass",
  },
  {
    category: "SVG",
    description:
      "A Gotham skyline drawn as a single SVG path — windows, setbacks and all — so it scales without a raster asset.",
    links: {
      demo: LIQUID_GLASS_SITE,
    },
    slug: "gotham-skyline",
    title: "Gotham Skyline",
  },
  {
    category: "Motion",
    description:
      "Nine greetings cycling at 180ms, handing off to a shared-layout avatar that flies into the profile header.",
    links: {},
    slug: "greeting-intro",
    title: "Greeting Intro",
  },
] as const satisfies readonly Craft[];
