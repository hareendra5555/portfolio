import { CopyLink } from "@/components/copy-link";
import { AppLink } from "@/components/ui/app-link";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { CERTIFICATIONS, DEGREES } from "@/constants/education";
import type { Credential } from "@/constants/education";
import { cn } from "@/lib/utils";

const CredentialRow = ({
  title,
  issuer,
  meta,
  href,
  hrefLabel,
}: Credential) => (
  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 py-4 transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30">
    <div className="min-w-0">
      <Title
        className="font-sans text-base font-normal"
        render={<h3>{title}</h3>}
      />
      <p className="text-muted-foreground text-sm font-normal">{issuer}</p>
    </div>
    <div className="flex shrink-0 items-center gap-3">
      <p className="text-muted-foreground text-sm font-normal tabular-nums">
        {meta}
      </p>
      {href && (
        <AppLink
          className="text-muted-foreground text-xs font-normal"
          href={href}
          target="_blank"
          external
          eventName="external_link_click"
          eventProperties={{
            context: "education_item",
            link_type: "credential",
            title,
            url: href,
          }}
        >
          {hrefLabel ?? "open"}
        </AppLink>
      )}
    </div>
  </div>
);

const CredentialList = ({
  items,
  className,
}: {
  items: Credential[];
  className?: string;
}) => (
  <div className={cn("group grid grid-cols-1 divide-y divide-border", className)}>
    {items.map((item) => (
      <CredentialRow {...item} key={item.key} />
    ))}
  </div>
);

const EducationSection = ({ className }: { className?: string }) => (
  <Section className={cn("flex flex-col gap-4", className)} id="education">
    <div className="group/education flex flex-1 items-center gap-1">
      <Title
        className="text-xl font-medium italic"
        render={<h2>{"education."}</h2>}
      />
      <CopyLink
        title={"Education"}
        className="hidden group-hover/education:inline-flex"
      />
    </div>

    <CredentialList items={DEGREES} />

    <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
      certifications
    </p>
    <CredentialList items={CERTIFICATIONS} className="-mt-2" />
  </Section>
);

export { EducationSection };
