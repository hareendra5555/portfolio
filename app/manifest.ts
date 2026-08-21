import type { MetadataRoute } from "next";

// Metadata routes are route handlers; `output: "export"` needs them pinned.
export const dynamic = "force-static";

import { SITE, META_THEME_COLORS } from "@/constants/site";
import { asset } from "@/constants/url";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: META_THEME_COLORS.light,
    description: SITE.DESCRIPTION.LONG,
    display: "standalone",
    icons: [
      {
        sizes: "192x192",
        src: asset("/android-chrome-192x192.png"),
        type: "image/png",
      },
      {
        sizes: "512x512",
        src: asset("/android-chrome-512x512.png"),
        type: "image/png",
      },
    ],
    name: SITE.NAME,
    short_name: SITE.AUTHOR.NAME,
    start_url: asset("/"),
    theme_color: META_THEME_COLORS.light,
  };
}
