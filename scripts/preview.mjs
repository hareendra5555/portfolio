// Serves ./out under the deploy base path, the way GitHub Pages will.
//
//   npm start        → http://localhost:4321/portfolio
//
// `npx serve out` would mount the export at "/", where every basePath-prefixed
// asset 404s — which looks like a broken build but is only a wrong mount point.
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/portfolio";
const port = Number(process.env.PORT ?? 4321);

const TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

/** Resolve a URL path to a file in ./out, trying the directory index too. */
const resolveFile = async (urlPath) => {
  const candidates = [urlPath];
  if (!path.extname(urlPath)) {
    candidates.push(`${urlPath}/index.html`, `${urlPath}.html`);
  }

  for (const candidate of candidates) {
    const filePath = path.join(outDir, path.normalize(candidate));
    // Refuse anything that escapes ./out.
    if (!filePath.startsWith(outDir)) {
      continue;
    }
    try {
      const info = await stat(filePath);
      if (info.isFile()) {
        return filePath;
      }
    } catch {
      // Try the next candidate.
    }
  }

  return null;
};

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");

  if (basePath && !pathname.startsWith(basePath)) {
    res.writeHead(302, { Location: basePath + pathname });
    res.end();
    return;
  }

  const relative = basePath ? pathname.slice(basePath.length) || "/" : pathname;
  const filePath =
    (await resolveFile(relative)) ?? (await resolveFile("/404.html"));

  if (!filePath) {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Not found. Run `npm run build` first.");
    return;
  }

  res.writeHead(filePath.endsWith("404.html") ? 404 : 200, {
    "content-type": TYPES[path.extname(filePath)] ?? "application/octet-stream",
  });
  createReadStream(filePath).pipe(res);
});

server.listen(port, () => {
  console.log(`Serving ./out at http://localhost:${port}${basePath}`);
});
