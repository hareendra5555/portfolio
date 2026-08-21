import { EXPERIENCES } from "@/constants/experiences";
import { LINK } from "@/constants/links";
import { asset, getBaseUrl } from "@/constants/url";

const [currentExperience] = EXPERIENCES;

export const USER = {
  address: {
    country: "USA",
    locality: "Gainesville, FL",
  },
  avatar: asset("/profile.jpg"),
  company: currentExperience.experienceOrg.name,
  email: LINK.EMAIL,
  firstName: "Hareendra",
  jobTitle: currentExperience.experienceTitle,
  lastName: "Nerusu",
  middleName: "Sri Nag",
  username: "hareendra5555",
  website: getBaseUrl(),
} as const;

export const NAME = `${USER.firstName} ${USER.lastName}`;
export const FULL_NAME = `${USER.firstName} ${USER.middleName} ${USER.lastName}`;
