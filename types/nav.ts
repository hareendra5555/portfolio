export type SectionId =
  | "contact"
  | "crafts"
  | "education"
  | "experiences"
  | "home"
  | "projects"
  | "publications"
  | "uses";

export type NavGroupId = "extras" | "work";

export interface NavItem {
  href: string;
  id: SectionId;
  label: string;
}

export interface NavGroup {
  id: NavGroupId;
  label: string;
  items: NavItem[];
}
