import type { Metadata } from "next";

import { LINK } from "@/constants/links";
import { SITE } from "@/constants/site";
import { asset } from "@/constants/url";
import { absoluteUrl } from "@/lib/utils";

interface CreateMetadataOptions {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  category?: string;
  noIndex?: boolean;
}

/**
 * The upstream site rendered per-page cards from an `/og` route handler. A
 * static export has no runtime to render them, so every page shares one
 * pre-rendered card committed at `public/og.png`.
 */
const getOgImageUrl = (): string => absoluteUrl("/og.png");

const createMetadata = (options: CreateMetadataOptions = {}): Metadata => {
  const {
    title,
    description = SITE.DESCRIPTION.SHORT,
    canonical,
    ogTitle,
    ogDescription,
    category,
    noIndex = false,
  } = options;

  const ogTitleText = ogTitle || title || SITE.NAME;
  const ogDescriptionText = ogDescription || description;
  const ogImage = getOgImageUrl();

  return {
    ...(title && { title }),
    description,
    ...(category && { category }),
    ...(canonical && {
      alternates: {
        canonical: absoluteUrl(canonical),
      },
    }),
    openGraph: {
      description: ogDescriptionText,
      images: [
        {
          alt: ogTitleText,
          height: 630,
          url: ogImage,
          width: 1200,
        },
      ],
      title: ogTitleText,
      type: "website",
      url: canonical ? absoluteUrl(canonical) : SITE.URL,
    },
    twitter: {
      card: "summary_large_image",
      description: ogDescriptionText,
      images: [
        {
          alt: ogTitleText,
          height: 630,
          url: ogImage,
          width: 1200,
        },
      ],
      title: ogTitleText,
    },
    ...(noIndex && {
      robots: {
        follow: false,
        index: false,
      },
    }),
  };
};

const baseMetadata: Metadata = {
  alternates: {
    canonical: SITE.URL,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE.NAME,
  },
  applicationName: SITE.NAME,
  authors: [{ name: SITE.AUTHOR.NAME, url: LINK.GITHUB }],
  category: "technology",
  creator: SITE.AUTHOR.NAME,
  description: SITE.DESCRIPTION.LONG,
  icons: {
    apple: {
      sizes: "180x180",
      type: "image/png",
      url: asset("/apple-touch-icon.png"),
    },
    icon: [
      {
        sizes: "32x32",
        url: asset("/favicon.ico"),
      },
      {
        sizes: "any",
        type: "image/svg+xml",
        url: asset("/favicon.svg"),
      },
    ],
    shortcut: asset("/favicon-16x16.png"),
  },
  keywords: [...SITE.KEYWORDS],
  metadataBase: new URL(SITE.URL),
  openGraph: {
    description: SITE.DESCRIPTION.SHORT,
    images: [
      {
        alt: SITE.NAME,
        height: 630,
        url: getOgImageUrl(),
        width: 1200,
      },
    ],
    locale: "en_US",
    siteName: SITE.NAME,
    title: SITE.NAME,
    type: "website",
    url: SITE.URL,
  },
  publisher: SITE.AUTHOR.NAME,
  title: {
    default: `${SITE.NAME} — Software Engineer`,
    template: `%s | ${SITE.NAME}`,
  },
  twitter: {
    card: "summary_large_image",
    description: SITE.DESCRIPTION.SHORT,
    images: [
      {
        alt: SITE.NAME,
        height: 630,
        url: getOgImageUrl(),
        width: 1200,
      },
    ],
    title: SITE.NAME,
  },
};

export { baseMetadata, createMetadata, getOgImageUrl };
