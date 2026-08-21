import { Icons } from "@/components/icons";
import { AppLink } from "@/components/ui/app-link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GITHUB, LINK } from "@/constants/links";

const NavItemGitHub = () => (
  <Tooltip>
    <TooltipTrigger
      render={
        <Button
          size="icon-sm"
          variant="ghost"
          nativeButton={false}
          render={
            <AppLink
              href={LINK.GITHUB}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              eventName="external_link_click"
              eventProperties={{
                context: "github_link",
                link_type: "github",
                title: "github profile",
                url: LINK.GITHUB,
              }}
            />
          }
        >
          <Icons.github />
        </Button>
      }
    />
    <TooltipContent side="bottom">{`@${GITHUB.user}`}</TooltipContent>
  </Tooltip>
);

export { NavItemGitHub };
