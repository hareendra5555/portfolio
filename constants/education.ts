import { LINK } from "@/constants/links";

export interface Credential {
  key: string;
  title: string;
  /** School, issuer or awarding body. */
  issuer: string;
  /** Right-hand meta column: years, GPA, or an issue date. */
  meta: string;
  /** Optional verification / programme link. */
  href?: string;
  /** Label for `href`. */
  hrefLabel?: string;
}

export const DEGREES: Credential[] = [
  {
    href: "https://www.cise.ufl.edu/",
    hrefLabel: "cise.ufl.edu",
    issuer: "University of Florida · Gainesville, FL",
    key: "ms-cs-uf",
    meta: "2024 — 2026 · GPA 3.92",
    title: "M.S. Computer Science",
  },
  {
    href: "https://www.amrita.edu/",
    hrefLabel: "amrita.edu",
    issuer: "Amrita Vishwa Vidyapeetham · Kerala, India",
    key: "btech-cse-amrita",
    meta: "2020 — 2024 · CGPA 8.95",
    title: "B.Tech Computer Science & Engineering",
  },
];

export const CERTIFICATIONS: Credential[] = [
  {
    href: LINK.AWS_SAA,
    hrefLabel: "verify",
    issuer: "Amazon Web Services",
    key: "aws-saa",
    meta: "Credly",
    title: "AWS Certified Solutions Architect — Associate",
  },
  {
    href: LINK.AWS_CCP,
    hrefLabel: "verify",
    issuer: "Amazon Web Services",
    key: "aws-ccp",
    meta: "Credly",
    title: "AWS Certified Cloud Practitioner",
  },
];
