/**
 * Client for the dev-server endpoint in vite.config.ts (local mode).
 * Only reachable while `npm run dev` is running.
 */

export type LocalContentKey = "projects" | "experience" | "skills" | "site";

export const loadLocal = async <T,>(key: LocalContentKey): Promise<T> => {
  const res = await fetch(`/__local-content/${key}`);
  if (!res.ok) throw new Error(`Failed to load ${key}`);
  return res.json();
};

export const saveLocal = async (key: LocalContentKey, data: unknown): Promise<void> => {
  const res = await fetch(`/__local-content/${key}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error ?? `Failed to save ${key}`);
};

export const uploadLocalImage = async (file: File): Promise<string> => {
  const res = await fetch(`/__local-content/upload?name=${encodeURIComponent(file.name)}`, {
    method: "POST",
    body: file,
  });
  if (!res.ok) throw new Error("Upload failed");
  return (await res.json()).path;
};
