import { env } from "@/env";

export const FALLBACK_SITE_ORIGIN =
  "https://hareendra5555.github.io/portfolio" as const;

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/portfolio";

export const getBaseUrl = () => {
  if (env.NODE_ENV !== "production") {
    return `http://localhost:3000${BASE_PATH}`;
  }
  return env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_ORIGIN;
};

/**
 * Prefix an app-absolute path with the deploy base path.
 *
 * `next/link` and `next/router` do this themselves, so this is only needed for
 * raw `<a href>` / `<img src>` targets — Base UI navigation and hover-card
 * triggers, and `next/image` under `unoptimized`, all render plain elements.
 */
export const asset = (path: string) => `${BASE_PATH}${path}`;
