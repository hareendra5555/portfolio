import { CopyLink } from "@/components/copy-link";
import { AppLink } from "@/components/ui/app-link";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { PUBLICATIONS } from "@/constants/publications";
import type { Publication } from "@/constants/publications";
import { cn } from "@/lib/utils";

const PublicationRow = ({
  title,
  venue,
  date,
  href,
  abstract,
}: Publication) => (
  <div className="w-full space-y-1 py-4 transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30">
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
      <Title
        className="font-sans text-base font-normal"
        render={<h3>{title}</h3>}
      />
      <AppLink
        className="text-muted-foreground shrink-0 text-xs font-normal"
        href={href}
        target="_blank"
        external
        eventName="external_link_click"
        eventProperties={{
          context: "publication_item",
          link_type: "paper",
          title,
          url: href,
        }}
      >
        Read
      </AppLink>
    </div>
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="text-muted-foreground font-mono">
        {venue}
      </Badge>
      <span className="text-muted-foreground text-sm tabular-nums">{date}</span>
    </div>
    <p className="text-muted-foreground text-sm font-normal">{abstract}</p>
  </div>
);

const PublicationSection = ({ className }: { className?: string }) => (
  <Section className={cn("flex flex-col gap-4", className)} id="publications">
    <div className="group/publications flex flex-1 items-center gap-1">
      <Title
        className="text-xl font-medium italic"
        render={<h2>{"publications."}</h2>}
      />
      <CopyLink
        title={"Publications"}
        className="hidden group-hover/publications:inline-flex"
      />
    </div>

    <div className="group grid grid-cols-1 divide-y divide-border">
      {PUBLICATIONS.map((publication) => (
        <PublicationRow {...publication} key={publication.key} />
      ))}
    </div>
  </Section>
);

export { PublicationSection };
