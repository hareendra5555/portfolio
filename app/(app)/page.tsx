import { AboutSection } from "@/components/about/section";
import { ContactSection } from "@/components/contact/section";
import { CraftSection } from "@/components/craft/section";
import { EducationSection } from "@/components/education/section";
import { ExperienceSection } from "@/components/experience/section";
import { ProjectSection } from "@/components/project/section";
import { PublicationSection } from "@/components/publications/section";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd } from "@/seo/json-ld";

const MainView = () => (
  <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: ROUTES.HOME }]} />
    <AboutSection />
    <ProjectSection />
    <CraftSection />
    <ExperienceSection />
    <EducationSection className="delay-500" />
    <PublicationSection className="delay-600" />
    <ContactSection className="delay-700" />
  </>
);

export default MainView;
