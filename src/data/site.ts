import siteData from "./site.json";

export interface SocialLink {
  /** One of the keys in SOCIAL_PLATFORMS — picks the icon. */
  platform: string;
  url: string;
  /** Overrides the platform name in the link's aria-label. */
  label?: string;
}

export interface SiteSettings {
  email: string;
  /** Shown as written, e.g. "+977 9845341517". */
  phone: string;
  /** Digits only, country code first. Blank → the phone links to tel: instead. */
  whatsapp: string;
  /** Prefilled WhatsApp message. */
  whatsappMessage: string;
  location: string;
  timezone: string;
  /** Hero headline and the footer label, e.g. "UI/UX Designer". */
  roleTitle: string;
  /** Hero paragraph under the headline. */
  tagline: string;
  /** "Download CV" link — a file in public/ or any URL. Blank hides the button. */
  cvUrl: string;
  footerNote: string;
  socials: SocialLink[];
}

/**
 * Built-in contact details and social links, used whenever Supabase isn't
 * configured. Editable from the /admin page — in local mode this file's JSON
 * is rewritten, in Supabase mode the site_settings row is updated instead.
 */
export const siteSettings: SiteSettings = siteData;
