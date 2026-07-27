import { useQuery } from "@tanstack/react-query";
import { supabase, resolveImageUrl } from "@/lib/supabase";
import { projects as fallbackProjects, type Project } from "@/data/projects";
import { experiences as fallbackExperiences, type Experience } from "@/data/experience";
import { skillGroups as fallbackSkillGroups, type SkillGroup } from "@/data/skills";
import { siteSettings as fallbackSiteSettings, type SiteSettings, type SocialLink } from "@/data/site";

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

export interface SiteSettingsRow {
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  whatsapp_message: string | null;
  location: string | null;
  timezone: string | null;
  role_title: string | null;
  tagline: string | null;
  cv_url: string | null;
  footer_note: string | null;
  socials: SocialLink[] | null;
}

export const SITE_SETTINGS_COLUMNS =
  "email, phone, whatsapp, whatsapp_message, location, timezone, role_title, tagline, cv_url, footer_note, socials";

/**
 * A column that was never filled in (null) falls back to src/data/site.json;
 * a column cleared to "" stays empty, which hides that item on the site.
 */
export const rowToSiteSettings = (row: SiteSettingsRow): SiteSettings => ({
  email: row.email ?? fallbackSiteSettings.email,
  phone: row.phone ?? fallbackSiteSettings.phone,
  whatsapp: row.whatsapp ?? fallbackSiteSettings.whatsapp,
  whatsappMessage: row.whatsapp_message ?? fallbackSiteSettings.whatsappMessage,
  location: row.location ?? fallbackSiteSettings.location,
  timezone: row.timezone ?? fallbackSiteSettings.timezone,
  roleTitle: row.role_title ?? fallbackSiteSettings.roleTitle,
  tagline: row.tagline ?? fallbackSiteSettings.tagline,
  cvUrl: row.cv_url ?? fallbackSiteSettings.cvUrl,
  footerNote: row.footer_note ?? fallbackSiteSettings.footerNote,
  socials: row.socials ?? fallbackSiteSettings.socials,
});

export const useSiteSettings = (): SiteSettings => {
  const { data } = useQuery({
    queryKey: ["site_settings"],
    enabled: !!supabase,
    queryFn: async (): Promise<SiteSettings | null> => {
      const { data, error } = await supabase!
        .from("site_settings")
        .select(SITE_SETTINGS_COLUMNS)
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      return data ? rowToSiteSettings(data as unknown as SiteSettingsRow) : null;
    },
  });
  return data ?? fallbackSiteSettings;
};
