import projectsData from "./projects.json";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  role?: string;
  description: string;
  details: string[];
  tools?: string[];
  image?: string;
  link?: string;
}

/**
 * Built-in content, used whenever Supabase isn't configured. Editable from
 * the /sandmin page when running `npm run dev` locally (writes projects.json).
 */
export const projects: Project[] = projectsData;
