import { useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { ChevronDown, ChevronUp, ImagePlus, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Shared building blocks for the admin editors (Supabase and local mode). */

export const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="space-y-2">
    <Label className="font-body text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
      {label}
    </Label>
    {children}
  </div>
);

export const FormCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`surface-card rounded-xl border border-border p-6 md:p-8 ${className}`}>{children}</div>
);

/** Numbered section divider, echoing the site's section headings. */
export const SectionLabel = ({ index, children }: { index: string; children: ReactNode }) => (
  <div className="mb-5 flex items-center gap-3">
    <span className="font-body text-[10px] font-medium tracking-[0.25em] text-red tabular-nums">{index}</span>
    <span className="font-body text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{children}</span>
    <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
  </div>
);

export const SaveButton = ({
  onClick,
  busy,
  label = "Save",
  className = "",
}: {
  onClick?: () => void;
  busy?: boolean;
  label?: string;
  className?: string;
}) => (
  <Button
    type={onClick ? "button" : "submit"}
    onClick={onClick}
    disabled={busy}
    className={`btn-sheen rounded-full bg-red px-6 font-body text-sm font-medium text-red-foreground transition-colors duration-300 hover:bg-red-muted ${className}`}
  >
    {busy ? "Saving…" : label}
  </Button>
);

export const DeleteButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className="rounded-full font-body text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
  >
    <Trash2 size={14} className="mr-1.5" />
    Delete
  </Button>
);

export const AddButton = ({ label, onClick, className = "" }: { label: string; onClick: () => void; className?: string }) => (
  <Button variant="outline" onClick={onClick} className={`rounded-full font-body text-sm ${className}`}>
    <Plus size={14} className="mr-1.5" />
    {label}
  </Button>
);

/** Plain text input that only accepts digits — no spinners, no stray characters. */
export const NumberInput = ({
  value,
  onChange,
  className = "",
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) => {
  const [text, setText] = useState(String(value));

  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setText(digits);
    onChange(digits === "" ? 0 : Number(digits));
  };

  return (
    <Input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={text}
      onChange={handle}
      onBlur={() => setText(String(value))}
      className={className}
    />
  );
};

export const OrderButtons = ({ onUp, onDown }: { onUp: () => void; onDown: () => void }) => (
  <div className="flex gap-0.5">
    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={onUp} title="Move up">
      <ChevronUp size={15} />
    </Button>
    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={onDown} title="Move down">
      <ChevronDown size={15} />
    </Button>
  </div>
);

export const SidebarItem = ({
  index,
  title,
  active,
  hidden,
  onClick,
}: {
  index: number;
  title: string;
  active: boolean;
  hidden?: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors duration-300 ${
      active ? "bg-secondary" : "hover:bg-secondary/50"
    }`}
  >
    <span
      className={`font-body text-[10px] tracking-[0.2em] tabular-nums ${
        active ? "text-red" : "text-muted-foreground"
      }`}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
    <span
      className={`flex-1 truncate font-body text-sm ${
        active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
      }`}
    >
      {title}
    </span>
    {hidden && <span className="font-body text-[9px] uppercase tracking-[0.15em] text-red">hidden</span>}
  </button>
);

/** Cover-image picker: dashed dropzone when empty, hover actions over the preview. */
export const ImagePicker = ({
  value,
  onChange,
  upload,
}: {
  value?: string | null;
  onChange: (url?: string) => void;
  upload: (file: File) => Promise<string>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const pick = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      onChange(await upload(file));
      toast.success("Image uploaded — remember to save");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={pick} />
      {value ? (
        <div className="group relative aspect-[4/3] w-full max-w-xs overflow-hidden rounded-lg border border-border">
          <img src={value} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <Button size="sm" variant="outline" className="rounded-full" onClick={() => inputRef.current?.click()} disabled={busy}>
              {busy ? "Uploading…" : "Replace"}
            </Button>
            <Button size="sm" variant="ghost" className="rounded-full" onClick={() => onChange(undefined)}>
              <X size={13} className="mr-1" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="flex aspect-[4/3] w-full max-w-xs flex-col items-center justify-center gap-2.5 rounded-lg border border-dashed border-border text-muted-foreground transition-colors duration-300 hover:border-red/60 hover:text-foreground"
        >
          <ImagePlus size={20} />
          <span className="font-body text-xs">{busy ? "Uploading…" : "Upload cover image"}</span>
        </button>
      )}
    </div>
  );
};

/** Textarea value → one array entry per non-empty line. */
export const linesToArray = (value: string): string[] =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

/** Comma-separated input → trimmed array. */
export const commaToArray = (value: string): string[] =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
