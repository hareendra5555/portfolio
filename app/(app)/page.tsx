import { AboutSection } from "@/components/about/section";
import { ContactSection } from "@/components/contact/section";
import { CraftSection } from "@/components/craft/section";
import { EducationSection } from "@/components/education/section";
import { ExperienceSection } from "@/components/experience/section";
import { ProjectSection } from "@/components/project/section";
import { PublicationSection } from "@/components/publications/section";
import { SoftwareSection } from "@/components/skills/software-section";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd } from "@/seo/json-ld";

const MainView = () => (
  <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: ROUTES.HOME }]} />
    <AboutSection />
    <ProjectSection />
    <CraftSection />
    <ExperienceSection />
    <SoftwareSection
      title="skills."
      copyTitle="Skills"
      sectionId="skills"
      viewAllHref={ROUTES.SKILLS}
      className="delay-500"
    />
    <EducationSection className="delay-600" />
    <PublicationSection className="delay-700" />
    <ContactSection className="delay-700" />
  </>
);

export default MainView;
