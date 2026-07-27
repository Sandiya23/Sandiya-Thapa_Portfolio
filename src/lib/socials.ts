import {
  Dribbble,
  Facebook,
  Figma,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import type { SocialLink } from "@/data/site";

/**
 * Platforms offered in the admin picker. Anything else still renders, with a
 * globe icon — so a link can be added without touching this list.
 */
export const SOCIAL_PLATFORMS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
  { value: "behance", label: "Behance", icon: Globe },
  { value: "dribbble", label: "Dribbble", icon: Dribbble },
  { value: "figma", label: "Figma", icon: Figma },
  { value: "github", label: "GitHub", icon: Github },
  { value: "twitter", label: "X / Twitter", icon: Twitter },
  { value: "facebook", label: "Facebook", icon: Facebook },
  { value: "youtube", label: "YouTube", icon: Youtube },
  { value: "email", label: "Email", icon: Mail },
  { value: "website", label: "Website", icon: Globe },
];

const platformOf = (platform: string) =>
  SOCIAL_PLATFORMS.find((p) => p.value === platform.trim().toLowerCase());

export const socialIcon = (platform: string): LucideIcon => platformOf(platform)?.icon ?? Globe;

export const socialLabel = (link: SocialLink): string =>
  link.label?.trim() || platformOf(link.platform)?.label || link.platform || "Link";
