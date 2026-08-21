import type { MetadataRoute } from "next";

// Metadata routes are route handlers; `output: "export"` needs them pinned.
export const dynamic = "force-static";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getCraftSlugs } from "@/lib/crafts";
import { getExperienceSlugs } from "@/lib/experiences";
import { getProjectSlugs } from "@/lib/projects";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const projectEntries = getProjectSlugs().map((slug) => ({
    changeFrequency: "monthly" as const,
    lastModified,
    priority: 0.8,
    url: absoluteUrl(`${ROUTES.PROJECTS}/${slug}`),
  }));

  const craftEntries = getCraftSlugs().map((slug) => ({
    changeFrequency: "monthly" as const,
    lastModified,
    priority: 0.7,
    url: absoluteUrl(`${ROUTES.CRAFTS}/${slug}`),
  }));

  const experienceEntries = getExperienceSlugs().map((slug) => ({
    changeFrequency: "monthly" as const,
    lastModified,
    priority: 0.7,
    url: absoluteUrl(`${ROUTES.EXPERIENCES}/${slug}`),
  }));

  const sectionEntries = [
    ROUTES.PROJECTS,
    ROUTES.CRAFTS,
    ROUTES.EXPERIENCES,
    ROUTES.SKILLS,
    ROUTES.CONTACT,
  ].map((route) => ({
    changeFrequency: "monthly" as const,
    lastModified,
    priority: 0.9,
    url: absoluteUrl(route),
  }));

  return [
    {
      changeFrequency: "monthly",
      lastModified,
      priority: 1,
      url: SITE.URL,
    },
    ...sectionEntries,
    ...projectEntries,
    ...craftEntries,
    ...experienceEntries,
  ];
}
