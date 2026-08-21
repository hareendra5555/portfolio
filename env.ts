import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_BASE_PATH: z.string().optional(),
    NEXT_PUBLIC_SITE_URL: z.url().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  server: {
    // Public JSON API used at build time to snapshot the contribution graph.
    GITHUB_CONTRIBUTIONS_API_URL: z.url().optional(),
    // Set to "1" to skip build-time link-preview fetches (faster, offline builds).
    SKIP_LINK_PREVIEWS: z.string().optional(),
  },
  shared: {
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
});
