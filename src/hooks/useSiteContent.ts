import { useQuery } from "@tanstack/react-query";
import { supabase, resolveImageUrl } from "@/lib/supabase";
import { projects as fallbackProjects, type Project } from "@/data/projects";
import { experiences as fallbackExperiences, type Experience } from "@/data/experience";
import { skillGroups as fallbackSkillGroups, type SkillGroup } from "@/data/skills";

/**
 * Each hook returns Supabase content when it's configured and has rows,
 * and the static content in src/data/ otherwise (no env vars, fetch error,
 * or empty table). Components never have to handle a loading/error state.
 */

interface ProjectRow {
  slug: string;
  title: string;
  subtitle: string;
  role: string | null;
  description: string;
  details: string[];
  tools: string[];
  image_url: string | null;
  link: string | null;
}

export const useProjects = (): Project[] => {
  const { data } = useQuery({
    queryKey: ["projects"],
    enabled: !!supabase,
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await supabase!
        .from("projects")
        .select("slug, title, subtitle, role, description, details, tools, image_url, link")
        .eq("published", true)
        .order("sort_order");
      if (error) throw error;
      return (data as ProjectRow[]).map((row) => ({
        id: row.slug,
        title: row.title,
        subtitle: row.subtitle,
        role: row.role ?? undefined,
        description: row.description,
        details: row.details ?? [],
        tools: row.tools?.length ? row.tools : undefined,
        image: resolveImageUrl(row.image_url),
        link: row.link ?? undefined,
      }));
    },
  });
  return data?.length ? data : fallbackProjects;
};

export const useExperiences = (): Experience[] => {
  const { data } = useQuery({
    queryKey: ["experiences"],
    enabled: !!supabase,
    queryFn: async (): Promise<Experience[]> => {
      const { data, error } = await supabase!
        .from("experiences")
        .select("role, company, details")
        .order("sort_order");
      if (error) throw error;
      return data as Experience[];
    },
  });
  return data?.length ? data : fallbackExperiences;
};

export const useSkillGroups = (): SkillGroup[] => {
  const { data } = useQuery({
    queryKey: ["skill_groups"],
    enabled: !!supabase,
    queryFn: async (): Promise<SkillGroup[]> => {
      const { data, error } = await supabase!
        .from("skill_groups")
        .select("category, skills")
        .order("sort_order");
      if (error) throw error;
      return data as SkillGroup[];
    },
  });
  return data?.length ? data : fallbackSkillGroups;
};
