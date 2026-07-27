import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { resolveImageUrl } from "@/lib/supabaseEnv";
import { Switch } from "@/components/ui/switch";
import {
  AddButton,
  DeleteButton,
  FormCard,
  NumberInput,
  SaveButton,
  SidebarItem,
  linesToArray,
  commaToArray,
} from "./fields";
import { ProjectFields, type ProjectDraft } from "./ProjectFields";

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
  sort_order: number;
  published: boolean;
}

const toDraft = (row: ProjectRow): ProjectDraft => ({
  slug: row.slug,
  title: row.title,
  subtitle: row.subtitle,
  role: row.role ?? "",
  description: row.description,
  detailsText: row.details.join("\n"),
  toolsText: row.tools.join(", "),
  link: row.link ?? "",
  image: row.image_url ?? undefined,
});

const emptyRow: ProjectRow = {
  slug: "",
  title: "",
  subtitle: "",
  role: "",
  description: "",
  details: [],
  tools: [],
  image_url: null,
  link: null,
  sort_order: 99,
  published: true,
};

/** Stores only the bucket path — the full URL is built from VITE_SUPABASE_URL at render time. */
const uploadToStorage = async (file: File): Promise<string> => {
  const path = `covers/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const { error } = await supabase!.storage.from("portfolio").upload(path, file);
  if (error) throw new Error(error.message);
  return path;
};

const ProjectForm = ({ initial, isNew }: { initial: ProjectRow; isNew: boolean }) => {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState(toDraft(initial));
  const [sortOrder, setSortOrder] = useState(initial.sort_order);
  const [published, setPublished] = useState(initial.published);
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof ProjectDraft>(key: K, value: ProjectDraft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
    queryClient.invalidateQueries({ queryKey: ["projects"] });
  };

  const save = async () => {
    const payload: ProjectRow = {
      slug: draft.slug.trim().toLowerCase().replace(/\s+/g, "-"),
      title: draft.title.trim(),
      subtitle: draft.subtitle.trim(),
      role: draft.role.trim() || null,
      description: draft.description,
      details: linesToArray(draft.detailsText),
      tools: commaToArray(draft.toolsText),
      image_url: draft.image ?? null,
      link: draft.link.trim() || null,
      sort_order: sortOrder,
      published,
    };
    if (!payload.slug || !payload.title) return void toast.error("Slug and title are required");
    setBusy(true);
    const { error } = isNew
      ? await supabase!.from("projects").insert(payload)
      : await supabase!.from("projects").update(payload).eq("slug", initial.slug);
    setBusy(false);
    if (error) return void toast.error(error.message);
    toast.success("Saved");
    refresh();
  };

  const remove = async () => {
    if (!confirm(`Delete "${initial.title}"? This cannot be undone.`)) return;
    const { error } = await supabase!.from("projects").delete().eq("slug", initial.slug);
    if (error) return void toast.error(error.message);
    toast.success("Deleted");
    refresh();
  };

  return (
    <FormCard>
      <ProjectFields draft={draft} set={set} upload={uploadToStorage} resolveImage={resolveImageUrl} />
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2.5 font-body text-sm text-muted-foreground">
            <Switch checked={published} onCheckedChange={setPublished} />
            {published ? "Published" : "Hidden"}
          </label>
          <label className="flex items-center gap-2.5 font-body text-sm text-muted-foreground">
            Order
            <NumberInput value={sortOrder} onChange={setSortOrder} className="h-8 w-16 text-center" />
          </label>
        </div>
        <div className="flex gap-2">
          {!isNew && <DeleteButton onClick={remove} />}
          <SaveButton onClick={save} busy={busy} />
        </div>
      </div>
    </FormCard>
  );
};

const ProjectsEditor = () => {
  const [selected, setSelected] = useState<string | "new" | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: async (): Promise<ProjectRow[]> => {
      const { data, error } = await supabase!.from("projects").select("*").order("sort_order");
      if (error) throw error;
      return data as ProjectRow[];
    },
  });

  if (isLoading) return <p className="font-body text-sm text-muted-foreground">Loading…</p>;

  const current = rows?.find((r) => r.slug === selected);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
      <div className="md:sticky md:top-24 md:self-start">
        <div className="space-y-0.5">
          {rows?.map((r, i) => (
            <SidebarItem
              key={r.slug}
              index={i}
              title={r.title || r.slug}
              active={selected === r.slug}
              hidden={!r.published}
              onClick={() => setSelected(r.slug)}
            />
          ))}
        </div>
        <AddButton label="New project" className="mt-4 w-full" onClick={() => setSelected("new")} />
      </div>
      <div>
        {selected === "new" && <ProjectForm key="new" initial={emptyRow} isNew />}
        {current && <ProjectForm key={current.slug} initial={current} isNew={false} />}
        {!selected && (
          <p className="font-body text-sm text-muted-foreground">
            Select a project to edit, or create a new one.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectsEditor;
