import { FlameIcon } from "lucide-react";

import { Icons } from "@/components/icons";
import { AppLink } from "@/components/ui/app-link";
import { Callout } from "@/components/ui/callout";
import { Metric, MetricLabel, MetricValue } from "@/components/ui/metric";
import { LINK } from "@/constants/links";
import type { LeetCodeStats } from "@/lib/leetcode/stats";
import { cn } from "@/lib/utils";

const nf = new Intl.NumberFormat("en-US");

const DIFFICULTY_LABELS = ["Easy", "Medium", "Hard"] as const;

const LeetCodeCard = ({
  stats,
  className,
}: {
  stats: LeetCodeStats | null;
  className?: string;
}) => {
  // The snapshot failed at build time — show nothing rather than a dead card.
  if (!stats) {
    return null;
  }

  const { solved, streak, totalActiveDays, ranking } = stats;
  const byDifficulty = [solved.easy, solved.medium, solved.hard];

  return (
    <Callout className={cn("space-y-3 p-3", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-muted-foreground inline-flex items-center gap-1.5 text-sm">
          <Icons.leetcode className="size-4" />
          LeetCode
        </span>
        <AppLink
          className="text-muted-foreground text-xs font-normal"
          href={LINK.LEETCODE}
          target="_blank"
          external
          eventName="external_link_click"
          eventProperties={{
            context: "leetcode_card",
            link_type: "leetcode",
            title: "leetcode profile",
            url: LINK.LEETCODE,
          }}
        >
          Profile
        </AppLink>
      </div>

      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Metric>
          <MetricLabel>Current streak</MetricLabel>
          <MetricValue className="inline-flex items-center gap-1.5">
            <FlameIcon className="size-4 shrink-0" aria-hidden />
            {streak}
            <span className="text-muted-foreground text-xs font-normal">
              {streak === 1 ? "day" : "days"}
            </span>
          </MetricValue>
        </Metric>

        <Metric>
          <MetricLabel>Solved</MetricLabel>
          <MetricValue>{nf.format(solved.all)}</MetricValue>
        </Metric>

        <Metric>
          <MetricLabel>Active days</MetricLabel>
          <MetricValue>{nf.format(totalActiveDays)}</MetricValue>
        </Metric>

        <Metric>
          <MetricLabel>Rank</MetricLabel>
          <MetricValue>
            {ranking === null ? "—" : nf.format(ranking)}
          </MetricValue>
        </Metric>
      </dl>

      <ul className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 px-1 text-xs">
        {DIFFICULTY_LABELS.map((label, index) => (
          <li key={label} className="tabular-nums">
            {label}
            <span className="text-foreground ml-1.5 font-medium">
              {byDifficulty[index]}
            </span>
          </li>
        ))}
      </ul>
    </Callout>
  );
};

export { LeetCodeCard };
