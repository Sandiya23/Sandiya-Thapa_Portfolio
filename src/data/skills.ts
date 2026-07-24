import skillsData from "./skills.json";

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = skillsData;
