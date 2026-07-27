import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Field, FormCard, SaveButton } from "./fields";
import ProjectsEditor from "./ProjectsEditor";
import ExperiencesEditor from "./ExperiencesEditor";
import SkillsEditor from "./SkillsEditor";
import SiteEditor from "./SiteEditor";
import {
  LocalProjectsEditor,
  LocalExperiencesEditor,
  LocalSkillsEditor,
  LocalSiteEditor,
} from "./LocalEditors";

const ModePill = ({ mode }: { mode: "supabase" | "local" }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
    <span className={`h-1.5 w-1.5 rounded-full ${mode === "supabase" ? "bg-emerald-500" : "bg-amber-500"}`} />
    {mode === "supabase" ? "Supabase" : "Local files"}
  </span>
);

const Shell = ({ children, mode }: { children: ReactNode; mode?: "supabase" | "local" }) => (
  <div className="min-h-screen bg-background text-foreground">
    <nav className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-6 py-4 md:px-10">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 justify-self-start font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="hidden sm:inline">Back to site</span>
        </Link>
        <Link to="/" className="font-display text-sm font-semibold tracking-[0.2em]">
          SANDIYA<span className="text-red">.</span>
        </Link>
        <div className="flex items-center gap-3 justify-self-end">
          {mode && <ModePill mode={mode} />}
          <ThemeToggle />
        </div>
      </div>
    </nav>
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">{children}</div>
  </div>
);

const PageHeading = ({ actions }: { actions?: ReactNode }) => (
  <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
    <div>
      <span className="font-body text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        Content Studio
      </span>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Edit content
      </h1>
    </div>
    {actions && <div className="flex items-center gap-2">{actions}</div>}
  </div>
);

const tabTriggerClass =
  "rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-0 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground shadow-none transition-colors data-[state=active]:border-red data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none";

const EditorTabs = ({ local }: { local?: boolean }) => (
  <Tabs defaultValue="projects">
    <TabsList className="h-auto w-full justify-start gap-8 rounded-none border-b border-border bg-transparent p-0">
      <TabsTrigger value="projects" className={tabTriggerClass}>
        Projects
      </TabsTrigger>
      <TabsTrigger value="experience" className={tabTriggerClass}>
        Experience
      </TabsTrigger>
      <TabsTrigger value="skills" className={tabTriggerClass}>
        Skills
      </TabsTrigger>
      <TabsTrigger value="contact" className={tabTriggerClass}>
        Contact
      </TabsTrigger>
    </TabsList>
    <TabsContent value="projects" className="mt-8">
      {local ? <LocalProjectsEditor /> : <ProjectsEditor />}
    </TabsContent>
    <TabsContent value="experience" className="mt-8">
      {local ? <LocalExperiencesEditor /> : <ExperiencesEditor />}
    </TabsContent>
    <TabsContent value="skills" className="mt-8">
      {local ? <LocalSkillsEditor /> : <SkillsEditor />}
    </TabsContent>
    <TabsContent value="contact" className="mt-8">
      {local ? <LocalSiteEditor /> : <SiteEditor />}
    </TabsContent>
  </Tabs>
);

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const signIn = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error(error.message);
  };

  return (
    <div className="mx-auto mt-14 max-w-sm">
      <FormCard className="p-8">
        <span className="font-body text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          Content Studio
        </span>
        <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
          Use the account created in your Supabase dashboard.
        </p>
        <form onSubmit={signIn} className="mt-7 space-y-4">
          <Field label="Email">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>
          <Field label="Password">
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Field>
          <SaveButton busy={busy} label="Sign in" className="w-full" />
        </form>
      </FormCard>
    </div>
  );
};

/** Local mode: edits the JSON files in src/data/ via the dev server. */
const LocalAdmin = ({ onSwitch }: { onSwitch?: () => void }) => (
  <>
    <PageHeading
      actions={
        onSwitch && (
          <Button variant="outline" size="sm" className="rounded-full font-body" onClick={onSwitch}>
            Switch to Supabase
          </Button>
        )
      }
    />
    <div className="mb-8 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3.5">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
      <p className="font-body text-xs leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">Local mode.</span> Changes are written to{" "}
        <code>src/data/*.json</code> on this computer — commit &amp; push (and redeploy) to publish
        them. Works only while <code>npm run dev</code> is running.
      </p>
    </div>
    <EditorTabs local />
  </>
);

const AdminPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<"supabase" | "local">(supabase ? "supabase" : "local");
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (mode === "local") {
    if (!isDev) {
      return (
        <Shell>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Supabase isn't configured
          </h1>
          <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-muted-foreground">
            The site is showing the built-in content from <code>src/data/</code>. To edit content on
            the live site, follow <code>supabase/README.md</code>: create a Supabase project, run{" "}
            <code>supabase/schema.sql</code>, and add <code>VITE_SUPABASE_URL</code> and{" "}
            <code>VITE_SUPABASE_ANON_KEY</code> to the deployment environment. To edit without
            Supabase, run <code>npm run dev</code> on your computer and open <code>/admin</code>{" "}
            there — edits are saved into the project's JSON files.
          </p>
        </Shell>
      );
    }
    return (
      <Shell mode="local">
        <LocalAdmin onSwitch={supabase ? () => setMode("supabase") : undefined} />
      </Shell>
    );
  }

  if (!ready) return <Shell mode="supabase">{null}</Shell>;
  if (!session)
    return (
      <Shell mode="supabase">
        <LoginForm />
        {isDev && (
          <div className="mx-auto mt-6 max-w-sm text-center">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full font-body text-muted-foreground"
              onClick={() => setMode("local")}
            >
              Or edit local files instead (no login)
            </Button>
          </div>
        )}
      </Shell>
    );

  return (
    <Shell mode="supabase">
      <PageHeading
        actions={
          <>
            {isDev && (
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full font-body text-muted-foreground"
                onClick={() => setMode("local")}
              >
                Edit local files
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="rounded-full font-body"
              onClick={() => supabase!.auth.signOut()}
            >
              Sign out
            </Button>
          </>
        }
      />
      <EditorTabs />
    </Shell>
  );
};

export default AdminPage;
