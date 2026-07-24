import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, SectionLabel, ImagePicker } from "./fields";

/** String-only draft of a project, shared by the Supabase and local forms. */
export interface ProjectDraft {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  description: string;
  detailsText: string; // one bullet per line
  toolsText: string; // comma-separated
  link: string;
  image?: string;
}

export const ProjectFields = ({
  draft,
  set,
  upload,
  resolveImage = (value) => value,
}: {
  draft: ProjectDraft;
  set: <K extends keyof ProjectDraft>(key: K, value: ProjectDraft[K]) => void;
  upload: (file: File) => Promise<string>;
  /** Turns the stored image reference (e.g. a bucket path) into a previewable URL. */
  resolveImage?: (value?: string) => string | undefined;
}) => (
  <div className="space-y-10">
    <div>
      <SectionLabel index="01">Basics</SectionLabel>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Title">
          <Input value={draft.title} onChange={(e) => set("title", e.target.value)} placeholder="Karma Trekking Website" />
        </Field>
        <Field label="Slug — URL: /work/…">
          <Input value={draft.slug} onChange={(e) => set("slug", e.target.value)} placeholder="karma-trekking" />
        </Field>
        <Field label="Subtitle — small red label">
          <Input value={draft.subtitle} onChange={(e) => set("subtitle", e.target.value)} placeholder="Client — UI/UX & Frontend" />
        </Field>
        <Field label="Role — case-study sidebar">
          <Input value={draft.role} onChange={(e) => set("role", e.target.value)} placeholder="UI/UX Design" />
        </Field>
      </div>
    </div>

    <div>
      <SectionLabel index="02">Case study</SectionLabel>
      <div className="space-y-5">
        <Field label="Overview">
          <Textarea rows={4} value={draft.description} onChange={(e) => set("description", e.target.value)} />
        </Field>
        <Field label="Key contributions — one per line">
          <Textarea rows={5} value={draft.detailsText} onChange={(e) => set("detailsText", e.target.value)} />
        </Field>
        <Field label="Tools — comma separated">
          <Input value={draft.toolsText} onChange={(e) => set("toolsText", e.target.value)} placeholder="Figma, HTML, CSS" />
        </Field>
      </div>
    </div>

    <div>
      <SectionLabel index="03">Media &amp; links</SectionLabel>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Cover image">
          <ImagePicker value={resolveImage(draft.image)} onChange={(url) => set("image", url)} upload={upload} />
        </Field>
        <Field label="Live site URL">
          <Input value={draft.link} onChange={(e) => set("link", e.target.value)} placeholder="https://…" />
        </Field>
      </div>
    </div>
  </div>
);
