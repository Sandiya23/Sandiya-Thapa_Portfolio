import { useMemo, useState, type ReactNode } from "react";
import { COVER_EXTS } from "@/lib/covers";

interface ProjectImageProps {
  /** Explicit, bundled image src — takes priority over public lookups. */
  explicit?: string;
  /** 1-based number used to look up /{publicIndex}.{ext} in the public folder. */
  publicIndex?: number;
  alt: string;
  /** Classes applied to the <img>. */
  className?: string;
  /** Optional scrim overlay rendered above the image (e.g. for legibility). */
  scrimClassName?: string;
  /** Rendered when no image can be resolved (used as the placeholder). */
  fallback: ReactNode;
}

/**
 * Resolves a project cover image. Tries the explicit bundled image first,
 * otherwise walks `public/{n}.{ext}` across common extensions. If every
 * candidate 404s (i.e. the image hasn't been placed yet), it renders the
 * provided placeholder instead — so cards look intentional until real
 * screenshots are dropped into /public.
 */
const ProjectImage = ({
  explicit,
  publicIndex,
  alt,
  className,
  scrimClassName,
  fallback,
}: ProjectImageProps) => {
  const candidates = useMemo(() => {
    if (explicit) return [explicit];
    if (publicIndex) return COVER_EXTS.map((ext) => `/${publicIndex}.${ext}`);
    return [];
  }, [explicit, publicIndex]);

  const [idx, setIdx] = useState(0);
  const src = candidates[idx];

  if (!src) return <>{fallback}</>;

  return (
    <>
      <img
        key={src}
        src={src}
        alt={alt}
        loading="lazy"
        className={className}
        onError={() => setIdx((i) => i + 1)}
      />
      {scrimClassName && <div className={scrimClassName} />}
    </>
  );
};

export default ProjectImage;
