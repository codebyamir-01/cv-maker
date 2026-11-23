import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import { createBlogThumbnail } from "./blog-thumbnail.mjs";

const root = process.cwd();
const registry = await fs.readFile(path.join(root, "src/lib/blog-data.tsx"), "utf8");
const ids = [...registry.matchAll(/^\s+post(\d+),\s*$/gm)].map(match => Number(match[1]));
const existingOriginalCovers = new Set([42, 46]);

for (const id of ids) {
  if (existingOriginalCovers.has(id)) continue;
  const file = path.join(root, `src/lib/posts/post-${id}.tsx`);
  let source = await fs.readFile(file, "utf8");
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const fields = new Map();
  function visit(node) {
    if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name)) fields.set(node.name.text, node.initializer);
    ts.forEachChild(node, visit);
  }
  visit(ast);
  const get = (key) => {
    const value = fields.get(key);
    if (!value || !ts.isStringLiteral(value)) throw new Error(`Missing ${key} in post-${id}`);
    return value.text;
  };
  const title = get("title");
  const slug = get("slug");
  const category = get("category");
  const bannerImage = await createBlogThumbnail({ id, slug, title, category });
  const replacements = [
    { key: "bannerImage", value: bannerImage },
    { key: "bannerAlt", value: `Illustrated cover for ${title}` },
  ].map(({ key, value }) => {
    const node = fields.get(key);
    if (!node) throw new Error(`Missing ${key} in post-${id}`);
    return { start: node.getStart(ast), end: node.getEnd(), value: JSON.stringify(value) };
  }).sort((a, b) => b.start - a.start);
  for (const { start, end, value } of replacements) source = source.slice(0, start) + value + source.slice(end);
  await fs.writeFile(file, source, "utf8");
  console.log(`post-${id}: ${bannerImage}`);
}

console.log(`Updated ${ids.length - existingOriginalCovers.size} published blog covers.`);
