import { ContactSection } from "@/components/contact/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Section } from "@/components/ui/section";
import { Textarea } from "@/components/ui/textarea";
import { Title } from "@/components/ui/title";
import { LINK } from "@/constants/links";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { BreadcrumbJsonLd, contactBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  canonical: ROUTES.CONTACT,
  description: `Get in touch with ${SITE.NAME}.`,
  title: "Contact",
});

const ContactPage = () => (
  <>
    <BreadcrumbJsonLd items={contactBreadcrumbs()} />
    <header className="animate-slide-in space-y-2 px-4 pt-6 pb-2">
      <Title className="text-xl font-medium italic">{"contact."}</Title>
      <p className="text-muted-foreground text-sm">
        Use the form, or reach me directly through any of the links below. I am
        open to new-grad software engineer and agentic AI roles.
      </p>
    </header>
    <Section className="delay-100 flex flex-col gap-6 py-2">
      <form
        action={`https://formsubmit.co/${LINK.EMAIL}`}
        method="POST"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <Input type="text" name="name" placeholder="Your name" required />
          <Input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <Textarea
          name="message"
          placeholder="Enter your message"
          required
          rows={6}
        />
        <div className="flex items-center justify-between">
          <Button type="submit">Send message</Button>
          <span className="text-muted-foreground text-sm">
            {"or "}
            <Kbd>↵ Enter</Kbd>
            {" to send"}
          </span>
        </div>
      </form>
    </Section>
    <ContactSection className="delay-200" />
  </>
);

export default ContactPage;
