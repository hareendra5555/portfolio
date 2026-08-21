export type CraftCategory = "CSS" | "Motion" | "SVG";

export interface CraftLinks {
  /** Optional MP4/WebM loop shown on hover and in the grid view. */
  preview?: string;
  /** Optional live page demonstrating the technique. */
  demo?: string;
}

export interface Craft {
  slug: string;
  title: string;
  description: string;
  category: CraftCategory;
  links: CraftLinks;
}
