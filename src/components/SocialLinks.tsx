import type { SocialLink } from "@/data/site";
import { socialIcon, socialLabel } from "@/lib/socials";

/** Renders the editable social links; links with no URL are skipped. */
const SocialLinks = ({
  links,
  size = 18,
  className = "flex items-center gap-4",
  linkClassName = "text-muted-foreground hover:text-red transition-colors duration-300",
}: {
  links: SocialLink[];
  size?: number;
  className?: string;
  linkClassName?: string;
}) => {
  const visible = links.filter((link) => link.url?.trim());
  if (!visible.length) return null;

  return (
    <div className={className}>
      {visible.map((link, i) => {
        const Icon = socialIcon(link.platform);
        return (
          <a
            key={`${link.platform}-${i}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={socialLabel(link)}
            className={linkClassName}
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
