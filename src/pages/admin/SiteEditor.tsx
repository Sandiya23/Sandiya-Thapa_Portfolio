import { useState, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { siteSettings as fallbackSiteSettings, type SiteSettings, type SocialLink } from "@/data/site";
import {
  SITE_SETTINGS_COLUMNS,
  rowToSiteSettings,
  type SiteSettingsRow,
} from "@/hooks/useSiteContent";
import { SOCIAL_PLATFORMS } from "@/lib/socials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddButton, Field, FormCard, OrderButtons, SaveButton, SectionLabel } from "./fields";

/**
 * Contact details, social links and the hero/footer copy that goes with them.
 * One shared form, saved either into the Supabase site_settings row or — in
 * local mode — into src/data/site.json.
 */

const SocialRow = ({
  link,
  onChange,
  onRemove,
  onMove,
}: {
  link: SocialLink;
  onChange: (link: SocialLink) => void;
  onRemove: () => void;
  onMove: (delta: -1 | 1) => void;
}) => (
  <div className="flex items-center gap-2">
    <Select value={link.platform} onValueChange={(platform) => onChange({ ...link, platform })}>
      <SelectTrigger className="w-[150px] shrink-0 font-body text-sm">
        <SelectValue placeholder="Platform" />
      </SelectTrigger>
      <SelectContent>
        {SOCIAL_PLATFORMS.map((p) => (
          <SelectItem key={p.value} value={p.value} className="font-body text-sm">
            {p.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <Input
      value={link.url}
      placeholder="https://…"
      onChange={(e) => onChange({ ...link, url: e.target.value })}
    />
    <OrderButtons onUp={() => onMove(-1)} onDown={() => onMove(1)} />
    <Button
      variant="ghost"
      size="icon"
      onClick={onRemove}
      title="Remove link"
      className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
    >
      <Trash2 size={14} />
    </Button>
  </div>
);

export const SiteForm = ({
  initial,
  onSave,
  busy,
  notice,
}: {
  initial: SiteSettings;
  onSave: (settings: SiteSettings) => void;
  busy?: boolean;
  notice?: ReactNode;
}) => {
  const [draft, setDraft] = useState<SiteSettings>({ ...initial, socials: [...initial.socials] });

  const set = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const setSocials = (next: SocialLink[]) => set("socials", next);

  const moveSocial = (index: number, delta: -1 | 1) => {
    const target = index + delta;
    if (target < 0 || target >= draft.socials.length) return;
    const next = [...draft.socials];
    [next[index], next[target]] = [next[target], next[index]];
    setSocials(next);
  };

  const save = () =>
    onSave({
      ...draft,
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      whatsapp: draft.whatsapp.replace(/\D/g, ""),
      location: draft.location.trim(),
      timezone: draft.timezone.trim(),
      roleTitle: draft.roleTitle.trim(),
      cvUrl: draft.cvUrl.trim(),
      socials: draft.socials
        .map((link) => ({ ...link, url: link.url.trim() }))
        .filter((link) => link.url),
    });

  return (
    <FormCard>
      {notice}

      <SectionLabel index="01">Contact</SectionLabel>
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Email">
            <Input
              type="email"
              value={draft.email}
              placeholder="you@example.com"
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>
          <Field label="Phone — as displayed">
            <Input
              value={draft.phone}
              placeholder="+977 9800000000"
              onChange={(e) => set("phone", e.target.value)}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="WhatsApp number — digits, country code first">
            <Input
              value={draft.whatsapp}
              inputMode="numeric"
              placeholder="9779800000000"
              onChange={(e) => set("whatsapp", e.target.value)}
            />
            <p className="font-body text-xs leading-relaxed text-muted-foreground">
              Leave empty to make the phone number a normal call link.
            </p>
          </Field>
          <Field label="WhatsApp prefilled message">
            <Textarea
              rows={3}
              value={draft.whatsappMessage}
              onChange={(e) => set("whatsappMessage", e.target.value)}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Location">
            <Input
              value={draft.location}
              placeholder="Kathmandu, Nepal"
              onChange={(e) => set("location", e.target.value)}
            />
          </Field>
          <Field label="Timezone label">
            <Input
              value={draft.timezone}
              placeholder="UTC+5:45"
              onChange={(e) => set("timezone", e.target.value)}
            />
          </Field>
        </div>
      </div>

      <div className="mt-10">
        <SectionLabel index="02">Social links</SectionLabel>
        <div className="space-y-3">
          {draft.socials.map((link, i) => (
            <SocialRow
              key={i}
              link={link}
              onChange={(next) => setSocials(draft.socials.map((l, j) => (j === i ? next : l)))}
              onRemove={() => setSocials(draft.socials.filter((_, j) => j !== i))}
              onMove={(delta) => moveSocial(i, delta)}
            />
          ))}
          {!draft.socials.length && (
            <p className="font-body text-sm text-muted-foreground">No social links yet.</p>
          )}
        </div>
        <AddButton
          label="Add social link"
          className="mt-4"
          onClick={() => setSocials([...draft.socials, { platform: "instagram", url: "" }])}
        />
      </div>

      <div className="mt-10">
        <SectionLabel index="03">Hero &amp; footer</SectionLabel>
        <div className="space-y-5">
          <Field label="Role title — hero headline and footer label">
            <Input
              value={draft.roleTitle}
              placeholder="UI/UX Designer"
              onChange={(e) => set("roleTitle", e.target.value)}
            />
          </Field>
          <Field label="Tagline — line under the hero headline">
            <Textarea rows={2} value={draft.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </Field>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="CV link — file in public/ or a full URL">
              <Input
                value={draft.cvUrl}
                placeholder="/Sandiya_Thapa_CV.pdf"
                onChange={(e) => set("cvUrl", e.target.value)}
              />
              <p className="font-body text-xs leading-relaxed text-muted-foreground">
                Leave empty to hide the "Download CV" button.
              </p>
            </Field>
            <Field label="Footer note">
              <Input value={draft.footerNote} onChange={(e) => set("footerNote", e.target.value)} />
            </Field>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end border-t border-border pt-6">
        <SaveButton onClick={save} busy={busy} />
      </div>
    </FormCard>
  );
};

const MissingTableNotice = ({ message }: { message: string }) => (
  <div className="mb-8 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3.5">
    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
    <p className="font-body text-xs leading-relaxed text-muted-foreground">
      <span className="font-medium text-foreground">Couldn't load the settings row.</span> If this
      is the first time you're using this tab, run the latest <code>supabase/schema.sql</code> in
      the Supabase SQL editor — it adds the <code>site_settings</code> table. ({message})
    </p>
  </div>
);

/** Supabase mode: reads and upserts the single site_settings row (id = 1). */
const SiteEditor = () => {
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "site_settings"],
    retry: false,
    queryFn: async (): Promise<SiteSettings> => {
      const { data, error } = await supabase!
        .from("site_settings")
        .select(SITE_SETTINGS_COLUMNS)
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      return data ? rowToSiteSettings(data as unknown as SiteSettingsRow) : fallbackSiteSettings;
    },
  });

  const save = async (settings: SiteSettings) => {
    setBusy(true);
    const { error } = await supabase!.from("site_settings").upsert({
      id: 1,
      email: settings.email,
      phone: settings.phone,
      whatsapp: settings.whatsapp,
      whatsapp_message: settings.whatsappMessage,
      location: settings.location,
      timezone: settings.timezone,
      role_title: settings.roleTitle,
      tagline: settings.tagline,
      cv_url: settings.cvUrl,
      footer_note: settings.footerNote,
      socials: settings.socials,
    });
    setBusy(false);
    if (error) return void toast.error(error.message);
    toast.success("Saved");
    queryClient.invalidateQueries({ queryKey: ["admin", "site_settings"] });
    queryClient.invalidateQueries({ queryKey: ["site_settings"] });
  };

  if (isLoading) return <p className="font-body text-sm text-muted-foreground">Loading…</p>;

  return (
    <SiteForm
      initial={data ?? fallbackSiteSettings}
      onSave={save}
      busy={busy}
      notice={
        error ? <MissingTableNotice message={error instanceof Error ? error.message : "unknown error"} /> : null
      }
    />
  );
};

export default SiteEditor;
