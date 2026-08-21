import { FileTextIcon, MailIcon } from "lucide-react";
import { Suspense } from "react";

import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/about/github-contributions";
import { IntroSection } from "@/components/about/intro-section";
import { AppLink } from "@/components/ui/app-link";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { LINK } from "@/constants/links";
import { getGitHubContributions } from "@/lib/github/contributions";

const AboutSection = () => {
  const contributions = getGitHubContributions();

  return (
    <IntroSection>
      <div className="prose text-muted-foreground prose-p:my-2 dark:prose-invert max-w-full text-sm leading-6 font-normal">
        <p>
          I build fast, reliable backend systems — async APIs, event-driven
          pipelines, and cloud-native services — and I care about the numbers
          that come out the other side: p95 latency, error budgets, deploys that
          nobody notices.
        </p>
        <p>
          Right now I am a software engineer at{" "}
          <AppLink
            href={LINK.UF_HEALTH}
            target="_blank"
            eventName="external_link_click"
            eventProperties={{
              context: "hero",
              link_type: "external",
              title: "UF Health",
              url: LINK.UF_HEALTH,
            }}
          >
            UF Health
          </AppLink>{" "}
          working on real-time clinical data services, fresh off an M.S. in
          Computer Science from the University of Florida — and increasingly
          pointed at <strong>agentic AI</strong>.
        </p>
      </div>
      <Callout className="space-y-1 p-1">
        <Suspense fallback={<GitHubContributionsFallback />}>
          <GitHubContributions contributions={contributions} />
        </Suspense>
        <div className="flex flex-col gap-3 p-2">
          <p>
            Open to new-grad software engineer and agentic AI roles. Start with
            my{" "}
            <AppLink
              href={LINK.RESUME}
              target="_blank"
              className="text-muted-foreground text-sm font-medium inline-flex min-w-17.25"
              external
              eventName="resume_click"
              eventProperties={{ location: "work_together" }}
            >
              Resume
            </AppLink>
          </p>
          <div className="flex flex-row items-center gap-2">
            <Button
              nativeButton={false}
              render={
                <AppLink
                  href={`mailto:${LINK.EMAIL}`}
                  target="_blank"
                  eventName="send_email_click"
                />
              }
            >
              <MailIcon />
              Send an email
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <AppLink
                  href={LINK.RESUME}
                  target="_blank"
                  eventName="resume_click"
                  eventProperties={{ location: "hero_button" }}
                />
              }
            >
              <FileTextIcon />
              View résumé
            </Button>
          </div>
        </div>
      </Callout>
    </IntroSection>
  );
};

export { AboutSection };
