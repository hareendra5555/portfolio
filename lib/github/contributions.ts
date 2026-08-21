import "server-only";
import { execSync } from "node:child_process";

import type { Activity } from "@/components/about/contribution-graph";
import { GITHUB } from "@/constants/links";

interface GitHubContributionsResponse {
  contributions: Activity[];
}

const CONTRIBUTIONS_API =
  process.env.GITHUB_CONTRIBUTIONS_API_URL ||
  "https://github-contributions-api.jogruber.de";

/**
 * Snapshotted at build time — `output: "export"` means there is no server left
 * to revalidate against, so a failed fetch degrades to an empty calendar rather
 * than failing the build.
 */
export const getGitHubContributions = async (): Promise<Activity[]> => {
  try {
    const res = await fetch(
      `${CONTRIBUTIONS_API}/v4/${GITHUB.user}?y=last`,
      { signal: AbortSignal.timeout(10_000) }
    );

    if (!res.ok) {
      return [];
    }

    const data = (await res.json()) as GitHubContributionsResponse;
    return data.contributions ?? [];
  } catch {
    return [];
  }
};

export const getLastUpdated = (): string => {
  try {
    const date = execSync("git log -1 --format=%cd", {
      encoding: "utf-8",
      timeout: 5000,
    }).trim();

    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
};
