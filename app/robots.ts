import type { MetadataRoute } from "next";

// Metadata routes are route handlers; `output: "export"` needs them pinned.
export const dynamic = "force-static";

import { absoluteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      userAgent: "*",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
