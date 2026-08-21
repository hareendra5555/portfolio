import "server-only";

import type { Activity } from "@/components/about/contribution-graph";
import { LEETCODE } from "@/constants/links";

const ENDPOINT = "https://leetcode.com/graphql";

const QUERY = `
  query userStats($username: String!) {
    matchedUser(username: $username) {
      username
      profile { ranking }
      submitStatsGlobal { acSubmissionNum { difficulty count } }
      userCalendar { streak totalActiveDays submissionCalendar }
    }
  }
`;

interface RawResponse {
  data?: {
    matchedUser: {
      profile: { ranking: number | null } | null;
      submitStatsGlobal: {
        acSubmissionNum: { difficulty: string; count: number }[];
      } | null;
      userCalendar: {
        streak: number;
        totalActiveDays: number;
        submissionCalendar: string;
      } | null;
    } | null;
  };
}

export interface LeetCodeStats {
  streak: number;
  totalActiveDays: number;
  ranking: number | null;
  solved: { all: number; easy: number; medium: number; hard: number };
  calendar: Activity[];
  /** When the snapshot was taken — the page is static, so this can go stale. */
  fetchedAt: string;
}

const CALENDAR_DAYS = 365;

/** LeetCode reports raw submission counts; bucket them into graph levels. */
const levelFor = (count: number): number => {
  if (count === 0) {
    return 0;
  }
  if (count <= 2) {
    return 1;
  }
  if (count <= 5) {
    return 2;
  }
  if (count <= 9) {
    return 3;
  }
  return 4;
};

const toIsoDate = (date: Date): string => date.toISOString().slice(0, 10);

/**
 * Expand the sparse `{unixSeconds: count}` map into a dense trailing year, so
 * the calendar renders every day rather than only the active ones.
 */
const buildCalendar = (submissionCalendar: string): Activity[] => {
  let byDate: Record<string, number> = {};

  try {
    const raw = JSON.parse(submissionCalendar) as Record<string, number>;
    byDate = Object.entries(raw).reduce<Record<string, number>>(
      (acc, [seconds, count]) => {
        acc[toIsoDate(new Date(Number(seconds) * 1000))] = count;
        return acc;
      },
      {}
    );
  } catch {
    return [];
  }

  const today = new Date();
  const days: Activity[] = [];

  for (let offset = CALENDAR_DAYS - 1; offset >= 0; offset--) {
    const day = new Date(today);
    day.setUTCDate(day.getUTCDate() - offset);
    const date = toIsoDate(day);
    const count = byDate[date] ?? 0;
    days.push({ count, date, level: levelFor(count) });
  }

  return days;
};

const countFor = (
  entries: { difficulty: string; count: number }[],
  difficulty: string
): number => entries.find((e) => e.difficulty === difficulty)?.count ?? 0;

/**
 * Snapshotted at build time. `output: "export"` means there is no server to
 * call LeetCode at request time, and leetcode.com/graphql sends no CORS
 * headers, so the browser cannot call it either. A failed fetch degrades to
 * null and the card is simply not rendered.
 */
export const getLeetCodeStats = async (): Promise<LeetCodeStats | null> => {
  try {
    const res = await fetch(ENDPOINT, {
      body: JSON.stringify({
        query: QUERY,
        variables: { username: LEETCODE.username },
      }),
      headers: {
        "Content-Type": "application/json",
        Referer: `https://leetcode.com/u/${LEETCODE.username}/`,
        "User-Agent": "Mozilla/5.0 (compatible; portfolio-build/1.0)",
      },
      method: "POST",
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      return null;
    }

    const json = (await res.json()) as RawResponse;
    const user = json.data?.matchedUser;

    if (!user?.userCalendar) {
      return null;
    }

    const submissions = user.submitStatsGlobal?.acSubmissionNum ?? [];

    return {
      calendar: buildCalendar(user.userCalendar.submissionCalendar),
      fetchedAt: new Date().toISOString(),
      ranking: user.profile?.ranking ?? null,
      solved: {
        all: countFor(submissions, "All"),
        easy: countFor(submissions, "Easy"),
        hard: countFor(submissions, "Hard"),
        medium: countFor(submissions, "Medium"),
      },
      streak: user.userCalendar.streak,
      totalActiveDays: user.userCalendar.totalActiveDays,
    };
  } catch {
    return null;
  }
};
