export type ContactIconKey = "email" | "github" | "leetcode" | "linkedin";

export interface ContactLink {
  display: string;
  url: string;
}

export interface Contact {
  title: string;
  icon: ContactIconKey;
  link: ContactLink;
}
