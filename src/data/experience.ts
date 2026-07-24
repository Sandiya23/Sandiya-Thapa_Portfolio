import experienceData from "./experience.json";

export interface Experience {
  role: string;
  company: string;
  details: string[];
}

export const experiences: Experience[] = experienceData;
