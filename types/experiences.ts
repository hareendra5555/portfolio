export type ExperienceCategory = "Consulting" | "HealthTech";

export interface ExperienceOrg {
  name: string;
  /** Empty string when the org has no public site to link to. */
  link: string;
  websiteDisplayName: string;
}

export interface ExperienceStatus {
  startAt: string;
  endAt: string;
}

export interface ExperienceLinks {
  website?: string;
  linkedin?: string;
  x?: string;
  github?: string;
}

export interface Experience {
  slug: string;
  experienceTitle: string;
  experienceDescription: string[];
  category: ExperienceCategory;
  orgDescription: string;
  experienceOrg: ExperienceOrg;
  experienceStatus: ExperienceStatus;
  experienceLinks: ExperienceLinks;
  experienceTech: string[];
}
