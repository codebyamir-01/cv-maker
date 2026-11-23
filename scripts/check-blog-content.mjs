import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

const root = process.cwd();
const registry = await fs.readFile(path.join(root, "src/lib/blog-data.tsx"), "utf8");
const ids = [...registry.matchAll(/^\s+post(\d+),\s*$/gm)].map(match => Number(match[1]));
const slugs = new Set();
const published = [];
const banners = new Set();
const bannerHashes = new Set();

if (ids.length === 0 || new Set(ids).size !== ids.length) {
  throw new Error("Blog registry is empty or contains duplicate post IDs.");
}

for (const id of ids) {
  const content = await fs.readFile(path.join(root, `src/lib/posts/post-${id}.tsx`), "utf8");
  const slug = content.match(/^\s*slug:\s*["']([^"']+)["']/m)?.[1];
  if (!slug || slugs.has(slug)) throw new Error(`Missing or duplicate slug in post-${id}: ${slug}`);
  if (content.includes("The 2026 Hiring Standard")) throw new Error(`Placeholder article is published: post-${id}`);
  slugs.add(slug);
  published.push({ id, content, slug });
}

for (const post of published) {
  const banner = post.content.match(/^\s*bannerImage:\s*["']([^"']+)["']/m)?.[1];
  if (!banner || !banner.startsWith("/")) throw new Error(`Missing local banner image: post-${post.id}`);
  if (banners.has(banner)) throw new Error(`Repeated banner image in post-${post.id}: ${banner}`);
  banners.add(banner);
  const bannerFile = path.join(root, "public", banner.slice(1));
  const bytes = await fs.readFile(bannerFile);
  const hash = createHash("sha256").update(bytes).digest("hex");
  if (bannerHashes.has(hash)) throw new Error(`Identical banner content found for post-${post.id}`);
  bannerHashes.add(hash);
  const image = await sharp(bytes).metadata();
  if (image.width < 1000 || image.height < 500) throw new Error(`Banner too small for post-${post.id}: ${image.width}x${image.height}`);

  const related = post.content.match(/relatedSlugs:\s*\[([^\]]*)\]/s)?.[1] || "";
  for (const [, slug] of related.matchAll(/["']([^"']+)["']/g)) {
    if (!slugs.has(slug) || slug === post.slug) {
      throw new Error(`Invalid related article ${slug} in post-${post.id}`);
    }
  }
}

const sourcePaths = [path.join(root, "src", "app"), path.join(root, "src", "components"), path.join(root, "src", "lib", "posts")];
const sourceFiles = [];
async function collect(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) await collect(full);
    else if (/\.(tsx|ts)$/.test(entry.name)) sourceFiles.push(full);
  }
}
for (const directory of sourcePaths) await collect(directory);

const pages = new Set(sourceFiles
  .filter(file => file.startsWith(path.join(root, "src", "app")) && path.basename(file) === "page.tsx")
  .map(file => "/" + path.relative(path.join(root, "src", "app"), path.dirname(file)).replaceAll("\\", "/")));
pages.add("/");

const exampleContent = await fs.readFile(path.join(root, "src", "lib", "resume-examples-data.ts"), "utf8");
const exampleSlugs = new Set([...exampleContent.matchAll(/\bslug:\s*["']([^"']+)["']/g)].map(match => match[1]));
const badLinks = [];
for (const file of sourceFiles.filter(file => !/post-\d+\.tsx$/.test(file) || ids.some(id => file.endsWith(`post-${id}.tsx`)))) {
  const content = await fs.readFile(file, "utf8");
  for (const [, target] of content.matchAll(/\bhref\s*(?:=|:)\s*["'](\/[^"'?#{}]*)["']/g)) {
    if (pages.has(target) || target.startsWith("/api/") || target.startsWith("/r/")) continue;
    if (target.startsWith("/blog/") && slugs.has(target.slice(6))) continue;
    if (target.startsWith("/resume-examples/") && exampleSlugs.has(target.slice(17))) continue;
    if (await fs.stat(path.join(root, "public", target.slice(1))).then(result => result.isFile()).catch(() => false)) continue;
    badLinks.push(`${path.relative(root, file)} -> ${target}`);
  }
}
if (badLinks.length) throw new Error(`Broken internal links:\n${badLinks.join("\n")}`);

console.log(`Checked ${ids.length} published posts, their images and related articles, and static internal links.`);
