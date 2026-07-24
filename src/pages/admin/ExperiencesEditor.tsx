import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddButton, DeleteButton, Field, FormCard, SaveButton, linesToArray } from "./fields";

interface ExperienceRow {
  id: number;
  role: string;
  company: string;
  details: string[];
  sort_order: number;
}

const RowForm = ({ initial, index }: { initial: ExperienceRow; index: number }) => {
  const queryClient = useQueryClient();
  const [role, setRole] = useState(initial.role);
  const [company, setCompany] = useState(initial.company);
  const [detailsText, setDetailsText] = useState(initial.details.join("\n"));
  const [sortOrder, setSortOrder] = useState(initial.sort_order);
  const [busy, setBusy] = useState(false);

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "experiences"] });
    queryClient.invalidateQueries({ queryKey: ["experiences"] });
  };

  const save = async () => {
    setBusy(true);
    const { error } = await supabase!
      .from("experiences")
      .update({ role, company, details: linesToArray(detailsText), sort_order: sortOrder })
      .eq("id", initial.id);
    setBusy(false);
    if (error) return void toast.error(error.message);
    toast.success("Saved");
    refresh();
  };

  const remove = async () => {
    if (!confirm(`Delete "${initial.role} — ${initial.company}"?`)) return;
    const { error } = await supabase!.from("experiences").delete().eq("id", initial.id);
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
        <DeleteButton onClick={remove} />
        <SaveButton onClick={save} busy={busy} />
      </div>
    </FormCard>
  );
};

const ExperiencesEditor = () => {
  const queryClient = useQueryClient();

  const { data: rows, isLoading } = useQuery({
    queryKey: ["admin", "experiences"],
    queryFn: async (): Promise<ExperienceRow[]> => {
      const { data, error } = await supabase!.from("experiences").select("*").order("sort_order");
      if (error) throw error;
      return data as ExperienceRow[];
    },
  });

  const add = async () => {
    const nextOrder = (rows?.at(-1)?.sort_order ?? 0) + 1;
    const { error } = await supabase!
      .from("experiences")
      .insert({ role: "New role", company: "Company", details: [], sort_order: nextOrder });
    if (error) return void toast.error(error.message);
    queryClient.invalidateQueries({ queryKey: ["admin", "experiences"] });
  };

  if (isLoading) return <p className="font-body text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6">
      {rows?.map((row, i) => (
        <RowForm key={row.id} initial={row} index={i} />
      ))}
      <AddButton label="Add experience" onClick={add} />
    </div>
  );
};

export default ExperiencesEditor;
