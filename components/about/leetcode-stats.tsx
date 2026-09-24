"use client";

import { format } from "date-fns";
import { FlameIcon } from "lucide-react";

import { Icons } from "@/components/icons";
import { AppLink } from "@/components/ui/app-link";
import { Callout } from "@/components/ui/callout";
import { Metric, MetricLabel, MetricValue } from "@/components/ui/metric";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LINK } from "@/constants/links";
import type { LeetCodeStats } from "@/lib/leetcode/stats";
import { cn } from "@/lib/utils";

import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "./contribution-graph";

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

  const { solved, streak, totalActiveDays, ranking, calendar } = stats;
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

      {calendar.length > 0 && (
        <ContributionGraph
          className="px-1"
          data={calendar}
          blockSize={11}
          blockMargin={3}
          blockRadius={2}
        >
          <ContributionGraphCalendar
            className="no-scrollbar"
            title="LeetCode Submissions"
          >
            {({ activity, dayIndex, weekIndex }) => (
              <Tooltip>
                <TooltipTrigger render={<g />}>
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                  />
                </TooltipTrigger>
                <TooltipContent className="font-sans">
                  <p>
                    {activity.count} submission
                    {activity.count === 1 ? "" : "s"} on{" "}
                    {format(new Date(activity.date), "dd.MM.yyyy")}
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
          </ContributionGraphCalendar>

          <ContributionGraphFooter>
            <ContributionGraphTotalCount>
              {({ totalCount, year }) => (
                <div className="text-muted-foreground">
                  {nf.format(totalCount)} submissions in {year}
                </div>
              )}
            </ContributionGraphTotalCount>

            <ContributionGraphLegend />
          </ContributionGraphFooter>
        </ContributionGraph>
      )}

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
