import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const registry = await fs.readFile(path.join(root, "src/lib/blog-data.tsx"), "utf8");
const ids = [...registry.matchAll(/^\s+post(\d+),\s*$/gm)].map(match => Number(match[1]));
const slugs = new Set();

if (ids.length === 0 || new Set(ids).size !== ids.length) {
  throw new Error("Blog registry is empty or contains duplicate post IDs.");
}

for (const id of ids) {
  const content = await fs.readFile(path.join(root, `src/lib/posts/post-${id}.tsx`), "utf8");
  const slug = content.match(/^\s*slug:\s*["']([^"']+)["']/m)?.[1];
  if (!slug || slugs.has(slug)) throw new Error(`Missing or duplicate slug in post-${id}: ${slug}`);
  if (content.includes("The 2026 Hiring Standard")) throw new Error(`Placeholder article is published: post-${id}`);
  slugs.add(slug);
}

console.log(`Checked ${ids.length} published posts with unique slugs and no fallback placeholders.`);
