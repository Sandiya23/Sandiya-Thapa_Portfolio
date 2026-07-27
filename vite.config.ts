import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";


/**
 * Dev-only content editor backend for the /sandmin page's "local mode".
 * Lets the browser read/write the JSON content files in src/data/ and save
 * uploaded images into public/images/. Only exists while `npm run dev` is
 * running — it is never part of the production build or the deployed site.
 */
const CONTENT_FILES: Record<string, { file: string; shape: "array" | "object" }> = {
  projects: { file: "src/data/projects.json", shape: "array" },
  experience: { file: "src/data/experience.json", shape: "array" },
  skills: { file: "src/data/skills.json", shape: "array" },
  site: { file: "src/data/site.json", shape: "object" },
};

const localContentEditor = (): Plugin => ({
  name: "local-content-editor",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use("/__local-content", (req, res) => {
      const url = new URL(req.url ?? "/", "http://localhost");
      const key = url.pathname.replace(/^\//, "");

      const send = (status: number, body: object) => {
        res.statusCode = status;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(body));
      };

      const readBody = (cb: (body: Buffer) => void) => {
        const chunks: Buffer[] = [];
        req.on("data", (chunk) => chunks.push(chunk));
        req.on("end", () => cb(Buffer.concat(chunks)));
      };

      if (key === "upload" && req.method === "POST") {
        const name = (url.searchParams.get("name") ?? "image")
          .replace(/[^a-zA-Z0-9._-]/g, "-")
          .replace(/^\.+/, "");
        readBody((body) => {
          const fileName = `${Date.now()}-${name}`;
          const dir = path.resolve(server.config.root, "public/images");
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(path.join(dir, fileName), body);
          send(200, { path: `/images/${fileName}` });
        });
        return;
      }

      const entry = CONTENT_FILES[key];
      if (!entry) return send(404, { error: `Unknown content key "${key}"` });
      const filePath = path.resolve(server.config.root, entry.file);

      if (req.method === "GET") {
        return send(200, JSON.parse(fs.readFileSync(filePath, "utf8")));
      }

      if (req.method === "PUT") {
        readBody((body) => {
          let data: unknown;
          try {
            data = JSON.parse(body.toString("utf8"));
          } catch {
            return send(400, { error: "Invalid JSON" });
          }
          const ok =
            entry.shape === "array"
              ? Array.isArray(data)
              : typeof data === "object" && data !== null && !Array.isArray(data);
          if (!ok) return send(400, { error: `Expected a JSON ${entry.shape}` });
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
          send(200, { ok: true });
        });
        return;
      }

      send(405, { error: "Method not allowed" });
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), localContentEditor()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
