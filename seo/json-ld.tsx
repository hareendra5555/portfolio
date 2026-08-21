import { LINK } from "@/constants/links";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { USER } from "@/constants/user";
import { absoluteUrl } from "@/lib/utils";
import { getOgImageUrl } from "@/seo/metadata";

const JsonLdScript = ({ data }: { data: Record<string, unknown> }) => (
  <script
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    type="application/ld+json"
  />
);

const WebsiteJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: SITE.DESCRIPTION.SHORT,
    inLanguage: "en-US",
    name: SITE.NAME,
    url: SITE.URL,
  };

  return <JsonLdScript data={jsonLd} />;
};

const PersonJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    address: {
      "@type": "PostalAddress",
      addressCountry: USER.address.country,
      addressLocality: USER.address.locality,
    },
    alternateName: SITE.NAME,
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "University of Florida" },
      { "@type": "CollegeOrUniversity", name: "Amrita Vishwa Vidyapeetham" },
    ],
    description: SITE.DESCRIPTION.LONG,
    email: `mailto:${USER.email}`,
    image: getOgImageUrl(),
    jobTitle: USER.jobTitle,
    knowsAbout: [
      "Backend engineering",
      "Distributed systems",
      "Cloud computing",
      "Agentic AI",
      "Python",
      "Go",
      "AWS",
    ],
    name: SITE.AUTHOR.FULL_NAME,
    sameAs: [LINK.GITHUB, LINK.LINKEDIN, LINK.LEETCODE],
    url: SITE.URL,
    worksFor: {
      "@type": "Organization",
      name: USER.company,
      url: LINK.UF_HEALTH,
    },
  };

  return <JsonLdScript data={jsonLd} />;
};

const FAQJsonLd = () => {
  const faqs = [
    {
      answer: SITE.DESCRIPTION.LONG,
      question: `Who is ${SITE.NAME}?`,
    },
    {
      answer:
        "Backend and distributed systems — async APIs with FastAPI, event-driven pipelines on Celery and Redis, PostgreSQL performance work, and containerized services on AWS EKS. Most recently, retrieval and agent pipelines built on LangGraph.",
      question: `What are ${USER.firstName}'s areas of expertise?`,
    },
    {
      answer: `Email ${USER.email}, or reach out on LinkedIn and GitHub. The contact page at ${absoluteUrl(ROUTES.CONTACT)} has a form as well.`,
      question: `How can I contact ${USER.firstName}?`,
    },
    {
      answer: `${USER.firstName} is a software engineer based in ${USER.address.locality}.`,
      question: `Where is ${USER.firstName} based?`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
      name: faq.question,
    })),
  };

  return <JsonLdScript data={jsonLd} />;
};

interface BreadcrumbItem {
  name: string;
  path: string;
}

const normalizeBreadcrumbPath = (path: string): string => {
  if (path === ROUTES.HOME) {
    return ROUTES.HOME;
  }

  return path.startsWith("/") ? path : `${ROUTES.HOME}${path}`;
};

const HOME_BREADCRUMB: BreadcrumbItem = { name: "Home", path: ROUTES.HOME };

const contactBreadcrumbs = (current?: BreadcrumbItem): BreadcrumbItem[] => [
  HOME_BREADCRUMB,
  { name: "Contact", path: ROUTES.CONTACT },
  ...(current ? [current] : []),
];

const projectsBreadcrumbs = (current?: BreadcrumbItem): BreadcrumbItem[] => [
  HOME_BREADCRUMB,
  { name: "Projects", path: ROUTES.PROJECTS },
  ...(current ? [current] : []),
];

const craftsBreadcrumbs = (current?: BreadcrumbItem): BreadcrumbItem[] => [
  HOME_BREADCRUMB,
  { name: "Crafts", path: ROUTES.CRAFTS },
  ...(current ? [current] : []),
];

const experiencesBreadcrumbs = (current?: BreadcrumbItem): BreadcrumbItem[] => [
  HOME_BREADCRUMB,
  { name: "Experience", path: ROUTES.EXPERIENCES },
  ...(current ? [current] : []),
];

const usesBreadcrumbs = (current?: BreadcrumbItem): BreadcrumbItem[] => [
  HOME_BREADCRUMB,
  { name: "Uses", path: ROUTES.USES },
  ...(current ? [current] : []),
];

const BreadcrumbJsonLd = ({ items }: { items: BreadcrumbItem[] }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      item: absoluteUrl(`${normalizeBreadcrumbPath(item.path)}`),
      name: item.name,
      position: index + 1,
    })),
  };

  return <JsonLdScript data={jsonLd} />;
};

const JsonLdScripts = () => (
  <>
    <WebsiteJsonLd />
    <PersonJsonLd />
    <FAQJsonLd />
  </>
);

export {
  BreadcrumbJsonLd,
  contactBreadcrumbs,
  craftsBreadcrumbs,
  experiencesBreadcrumbs,
  FAQJsonLd,
  JsonLdScripts,
  PersonJsonLd,
  projectsBreadcrumbs,
  usesBreadcrumbs,
  WebsiteJsonLd,
};
export type { BreadcrumbItem };
