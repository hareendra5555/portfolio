"use client";

import { useState } from "react";

import { CopyLink } from "@/components/copy-link";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { ViewAllButton } from "@/components/view-all-button";
import { ViewToggle } from "@/components/view-tabs";
import { SOFTWARE_ITEMS } from "@/constants/software";
import type { SoftwareItem } from "@/constants/software";
import type { Variant } from "@/lib/events";
import { cn } from "@/lib/utils";

import { TechStackItem } from "./item";

const groupByCategory = (
  items: SoftwareItem[]
): Record<string, SoftwareItem[]> => {
  const grouped: Record<string, SoftwareItem[]> = {};
  for (const item of items) {
    for (const category of item.categories) {
      (grouped[category] ??= []).push(item);
    }
  }
  return grouped;
};

interface SoftwareSectionProps {
  /** Heading text. The home page shows this list as "skills." */
  title?: string;
  copyTitle?: string;
  sectionId?: string;
  /** When set, a "View all" button links to the full page. */
  viewAllHref?: string;
  className?: string;
}

const SoftwareSection = ({
  title = "software.",
  copyTitle = "Software",
  sectionId = "stack",
  viewAllHref,
  className,
}: SoftwareSectionProps) => {
  const [variant, setVariant] = useState<Variant>("list");
  const grouped = groupByCategory(SOFTWARE_ITEMS);

  return (
    <Section
      id={sectionId}
      className={cn("delay-200 flex flex-col gap-4", className)}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="group/stack flex flex-1 items-center gap-1">
          <Title
            className="text-xl font-medium italic"
            render={<h2>{title}</h2>}
          />
          <CopyLink
            title={copyTitle}
            className="hidden group-hover/stack:inline-flex"
          />
        </div>

        <ViewToggle value={variant} onChange={setVariant} section="stack" />
      </div>

      <div
        className={cn(
          "group relative",
          variant === "list" &&
            "divide-y divide-border [--badge-height:--spacing(6)] [--col-left-width:--spacing(40)]"
        )}
      >
        {Object.entries(grouped).map(([category, catItems], index) => (
          <TechStackItem
            key={category}
            index={index}
            category={category}
            items={catItems}
            variant={variant}
          />
        ))}
      </div>

      {viewAllHref ? (
        <ViewAllButton href={viewAllHref} eventName="stack" className="mx-auto" />
      ) : null}
    </Section>
  );
};

export { SoftwareSection };
