import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddButton, DeleteButton, Field, FormCard, SaveButton, commaToArray } from "./fields";

interface SkillGroupRow {
  id: number;
  category: string;
  skills: string[];
  sort_order: number;
}

const RowForm = ({ initial, index }: { initial: SkillGroupRow; index: number }) => {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState(initial.category);
  const [skillsText, setSkillsText] = useState(initial.skills.join(", "));
  const [sortOrder, setSortOrder] = useState(initial.sort_order);
  const [busy, setBusy] = useState(false);

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "skill_groups"] });
    queryClient.invalidateQueries({ queryKey: ["skill_groups"] });
  };

  const save = async () => {
    setBusy(true);
    const { error } = await supabase!
      .from("skill_groups")
      .update({ category, skills: commaToArray(skillsText), sort_order: sortOrder })
      .eq("id", initial.id);
    setBusy(false);
    if (error) return void toast.error(error.message);
    toast.success("Saved");
    refresh();
  };

  const remove = async () => {
    if (!confirm(`Delete "${initial.category}"?`)) return;
    const { error } = await supabase!.from("skill_groups").delete().eq("id", initial.id);
    if (error) return void toast.error(error.message);
    toast.success("Deleted");
    refresh();
  };

  return (
    <FormCard>
      <div className="mb-6 flex items-center justify-between">
        <span className="font-body text-[10px] font-medium tracking-[0.25em] text-red tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <label className="flex items-center gap-2.5 font-body text-sm text-muted-foreground">
          Order
          <Input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="h-8 w-16 text-center"
          />
        </label>
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
        <DeleteButton onClick={remove} />
        <SaveButton onClick={save} busy={busy} />
      </div>
    </FormCard>
  );
};

const SkillsEditor = () => {
  const queryClient = useQueryClient();

  const { data: rows, isLoading } = useQuery({
    queryKey: ["admin", "skill_groups"],
    queryFn: async (): Promise<SkillGroupRow[]> => {
      const { data, error } = await supabase!.from("skill_groups").select("*").order("sort_order");
      if (error) throw error;
      return data as SkillGroupRow[];
    },
  });

  const add = async () => {
    const nextOrder = (rows?.at(-1)?.sort_order ?? 0) + 1;
    const { error } = await supabase!
      .from("skill_groups")
      .insert({ category: "New category", skills: [], sort_order: nextOrder });
    if (error) return void toast.error(error.message);
    queryClient.invalidateQueries({ queryKey: ["admin", "skill_groups"] });
  };

  if (isLoading) return <p className="font-body text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6">
      {rows?.map((row, i) => (
        <RowForm key={row.id} initial={row} index={i} />
      ))}
      <AddButton label="Add skill group" onClick={add} />
    </div>
  );
};

export default SkillsEditor;
