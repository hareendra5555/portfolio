export const GITHUB = {
  branch: "main",
  repo: "portfolio_aug_2026",
  user: "hareendra5555",
} as const;

const GITHUB_URL = `https://github.com/${GITHUB.user}`;

export const LINK = {
  AWS_CCP:
    "https://www.credly.com/badges/70577bc9-9a2a-49e6-bfc5-33c76db22828/public_url",
  AWS_SAA:
    "https://www.credly.com/badges/06f970d6-c70e-44ab-9804-bf45594e1265/linked_in_profile",
  EMAIL: "hareendra05@gmail.com",
  GITHUB: GITHUB_URL,
  GITHUB_REPO: `https://github.com/${GITHUB.user}/${GITHUB.repo}`,
  LEETCODE: "https://leetcode.com/u/hareendra21/",
  LICENSE: `https://github.com/${GITHUB.user}/${GITHUB.repo}/blob/${GITHUB.branch}/LICENSE`,
  LINKEDIN: "https://www.linkedin.com/in/hareendrasrinag/",
  RESUME:
    "https://drive.google.com/drive/folders/1uuEA_X0aUA7srE8CocAKraa96e5xipoj?usp=sharing",
  UF: "https://www.ufl.edu/",
  UF_HEALTH: "https://ufhealth.org/",
  UPSTREAM: "https://github.com/Aniket-508/aniketpawar.com",
} as const;
