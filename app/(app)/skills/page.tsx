import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { Title } from "@/components/ui/title";
import { HardwareSection } from "@/components/skills/hardware-section";
import { SoftwareSection } from "@/components/skills/software-section";
import { HARDWARE_ITEMS } from "@/constants/hardware";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd, skillsBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

const DESCRIPTION =
  "The languages, frameworks and infrastructure I reach for, and the tools I keep open.";

export const metadata = createMetadata({
  canonical: ROUTES.SKILLS,
  description: DESCRIPTION,
  title: "Skills",
});

const SkillsPage = async () => {
  const hardwareLinks = HARDWARE_ITEMS.map((item) => item.href);
  const previews = await prefetchGlimpses(hardwareLinks);

  return (
    <>
      <BreadcrumbJsonLd items={skillsBreadcrumbs()} />
      <header className="animate-slide-in space-y-2 px-4 pt-6 pb-4">
        <Title className="text-xl font-medium italic">{"skills."}</Title>
        <p className="text-muted-foreground text-sm">{DESCRIPTION}</p>
      </header>

      <SoftwareSection />
      <HardwareSection previews={previews} />
    </>
  );
};

export default SkillsPage;
