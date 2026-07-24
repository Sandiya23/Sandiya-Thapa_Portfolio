import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Project } from "@/data/projects";
import type { Experience } from "@/data/experience";
import type { SkillGroup } from "@/data/skills";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AddButton,
  DeleteButton,
  Field,
  FormCard,
  OrderButtons,
  SaveButton,
  SidebarItem,
  linesToArray,
  commaToArray,
} from "./fields";
import { ProjectFields, type ProjectDraft } from "./ProjectFields";
import { loadLocal, saveLocal, uploadLocalImage, type LocalContentKey } from "./localApi";

/**
 * Editors for "local mode": the same content forms, but reading/writing the
 * JSON files in src/data/ through the dev server instead of Supabase.
 * Order on the site = order in the list (use the ↑ / ↓ buttons).
 */

const useLocalList = <T,>(key: LocalContentKey) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["local", key],
    queryFn: () => loadLocal<T[]>(key),
  });

  const write = async (next: T[]) => {
    try {
      await saveLocal(key, next);
      toast.success("Saved to src/data — commit & push to publish");
      queryClient.invalidateQueries({ queryKey: ["local", key] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    }
  };

  const replaceAt = (index: number, item: T) => write((data ?? []).map((x, i) => (i === index ? item : x)));
  const append = (item: T) => write([...(data ?? []), item]);
  const removeAt = (index: number) => write((data ?? []).filter((_, i) => i !== index));
  const move = (index: number, delta: -1 | 1) => {
    const next = [...(data ?? [])];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    return write(next);
  };

  return { data, isLoading, replaceAt, append, removeAt, move };
};

// --- Projects ---------------------------------------------------------------

const toDraft = (p: Project): ProjectDraft => ({
  slug: p.id,
  title: p.title,
  subtitle: p.subtitle,
  role: p.role ?? "",
  description: p.description,
  detailsText: p.details.join("\n"),
  toolsText: (p.tools ?? []).join(", "),
  link: p.link ?? "",
  image: p.image,
});

const emptyProject: Project = {
  id: "",
  title: "",
  subtitle: "",
  description: "",
  details: [],
};

const LocalProjectForm = ({
  initial,
  onSave,
  onDelete,
}: {
  initial: Project;
  onSave: (p: Project) => void;
  onDelete?: () => void;
}) => {
  const [draft, setDraft] = useState(toDraft(initial));

  const set = <K extends keyof ProjectDraft>(key: K, value: ProjectDraft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const save = () => {
    const id = draft.slug.trim().toLowerCase().replace(/\s+/g, "-");
    if (!id || !draft.title.trim()) return void toast.error("Slug and title are required");
    const tools = commaToArray(draft.toolsText);
    onSave({
      id,
      title: draft.title.trim(),
      subtitle: draft.subtitle.trim(),
      role: draft.role.trim() || undefined,
      description: draft.description,
      details: linesToArray(draft.detailsText),
      tools: tools.length ? tools : undefined,
      image: draft.image || undefined,
      link: draft.link.trim() || undefined,
    });
  };

  return (
    <FormCard>
      <ProjectFields draft={draft} set={set} upload={uploadLocalImage} />
      <div className="mt-10 flex justify-end gap-2 border-t border-border pt-6">
        {onDelete && <DeleteButton onClick={onDelete} />}
        <SaveButton onClick={save} />
      </div>
    </FormCard>
  );
};

export const LocalProjectsEditor = () => {
  const { data, isLoading, replaceAt, append, removeAt, move } = useLocalList<Project>("projects");
  const [selected, setSelected] = useState<number | "new" | null>(null);

  if (isLoading) return <p className="font-body text-sm text-muted-foreground">Loading…</p>;

  const current = typeof selected === "number" ? data?.[selected] : undefined;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[260px_1fr]">
      <div className="md:sticky md:top-24 md:self-start">
        <div className="space-y-0.5">
          {data?.map((p, i) => (
            <div key={p.id} className="flex items-center gap-1">
              <SidebarItem index={i} title={p.title || p.id} active={selected === i} onClick={() => setSelected(i)} />
              <OrderButtons onUp={() => move(i, -1)} onDown={() => move(i, 1)} />
            </div>
          ))}
        </div>
        <AddButton label="New project" className="mt-4 w-full" onClick={() => setSelected("new")} />
      </div>
      <div>
        {selected === "new" && (
          <LocalProjectForm
            key="new"
            initial={emptyProject}
            onSave={(p) => {
              append(p);
              setSelected(null);
            }}
          />
        )}
        {current && typeof selected === "number" && (
          <LocalProjectForm
            key={current.id}
            initial={current}
            onSave={(p) => replaceAt(selected, p)}
            onDelete={() => {
              if (!confirm(`Delete "${current.title}"?`)) return;
              removeAt(selected);
              setSelected(null);
            }}
          />
        )}
        {selected === null && (
          <p className="font-body text-sm text-muted-foreground">
            Select a project to edit, or create a new one. Use the arrows to reorder.
          </p>
        )}
      </div>
    </div>
  );
};

// --- Experience -------------------------------------------------------------

const LocalExperienceForm = ({
  initial,
  index,
  onSave,
  onDelete,
  onMove,
}: {
  initial: Experience;
  index: number;
  onSave: (e: Experience) => void;
  onDelete: () => void;
  onMove: (delta: -1 | 1) => void;
}) => {
  const [role, setRole] = useState(initial.role);
  const [company, setCompany] = useState(initial.company);
  const [detailsText, setDetailsText] = useState(initial.details.join("\n"));

  return (
    <FormCard>
      <div className="mb-6 flex items-center justify-between">
        <span className="font-body text-[10px] font-medium tracking-[0.25em] text-red tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <OrderButtons onUp={() => onMove(-1)} onDown={() => onMove(1)} />
      </div>
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Role">
            <Input value={role} onChange={(e) => setRole(e.target.value)} />
          </Field>
          <Field label="Company">
            <Input value={company} onChange={(e) => setCompany(e.target.value)} />
          </Field>
        </div>
        <Field label="Highlights — one per line">
          <Textarea rows={4} value={detailsText} onChange={(e) => setDetailsText(e.target.value)} />
        </Field>
      </div>
      <div className="mt-6 flex justify-end gap-2 border-t border-border pt-5">
        <DeleteButton onClick={onDelete} />
        <SaveButton onClick={() => onSave({ role, company, details: linesToArray(detailsText) })} />
      </div>
    </FormCard>
  );
};

export const LocalExperiencesEditor = () => {
  const { data, isLoading, replaceAt, append, removeAt, move } = useLocalList<Experience>("experience");

  if (isLoading) return <p className="font-body text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6">
      {data?.map((exp, i) => (
        <LocalExperienceForm
          key={`${exp.company}-${i}`}
          initial={exp}
          index={i}
          onSave={(e) => replaceAt(i, e)}
          onMove={(delta) => move(i, delta)}
          onDelete={() => {
            if (!confirm(`Delete "${exp.role} — ${exp.company}"?`)) return;
            removeAt(i);
          }}
        />
      ))}
      <AddButton
        label="Add experience"
        onClick={() => append({ role: "New role", company: "Company", details: [] })}
      />
    </div>
  );
};

// --- Skills -----------------------------------------------------------------

const LocalSkillGroupForm = ({
  initial,
  index,
  onSave,
  onDelete,
  onMove,
}: {
  initial: SkillGroup;
  index: number;
  onSave: (g: SkillGroup) => void;
  onDelete: () => void;
  onMove: (delta: -1 | 1) => void;
}) => {
  const [category, setCategory] = useState(initial.category);
  const [skillsText, setSkillsText] = useState(initial.skills.join(", "));

  return (
    <FormCard>
      <div className="mb-6 flex items-center justify-between">
        <span className="font-body text-[10px] font-medium tracking-[0.25em] text-red tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <OrderButtons onUp={() => onMove(-1)} onDown={() => onMove(1)} />
      </div>
      <div className="space-y-5">
        <Field label="Category">
          <Input value={category} onChange={(e) => setCategory(e.target.value)} />
        </Field>
        <Field label="Skills — comma separated">
          <Textarea rows={2} value={skillsText} onChange={(e) => setSkillsText(e.target.value)} />
        </Field>
      </div>
      <div className="mt-6 flex justify-end gap-2 border-t border-border pt-5">
        <DeleteButton onClick={onDelete} />
        <SaveButton onClick={() => onSave({ category, skills: commaToArray(skillsText) })} />
      </div>
    </FormCard>
  );
};

export const LocalSkillsEditor = () => {
  const { data, isLoading, replaceAt, append, removeAt, move } = useLocalList<SkillGroup>("skills");

  if (isLoading) return <p className="font-body text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6">
      {data?.map((group, i) => (
        <LocalSkillGroupForm
          key={`${group.category}-${i}`}
          initial={group}
          index={i}
          onSave={(g) => replaceAt(i, g)}
          onMove={(delta) => move(i, delta)}
          onDelete={() => {
            if (!confirm(`Delete "${group.category}"?`)) return;
            removeAt(i);
          }}
        />
      ))}
      <AddButton label="Add skill group" onClick={() => append({ category: "New category", skills: [] })} />
    </div>
  );
};
