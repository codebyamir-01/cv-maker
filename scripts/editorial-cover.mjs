import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/** Require an existing, reviewed cover before a new article is published. */
export async function requireEditorialCover({ title, registrySource }) {
  const filename = process.env.BLOG_COVER_IMAGE;
  const alt = process.env.BLOG_COVER_ALT;
  if (!filename || !alt) {
    throw new Error("A reviewed cover is required. Set BLOG_COVER_IMAGE to an image filename in public/images/blog and BLOG_COVER_ALT to a truthful scene description before publishing.");
  }
  if (!/^[a-z0-9][a-z0-9-]*\.(webp|png|jpg)$/.test(filename)) throw new Error("BLOG_COVER_IMAGE must be a filename in public/images/blog.");
  if (alt.trim().length < 12 || alt.trim().length > 180) throw new Error("BLOG_COVER_ALT must describe the image in 12 to 180 characters.");
  if (!title?.trim()) throw new Error("Article title is required before selecting a cover.");
  const image = `/images/blog/${filename}`;
  const existingFiles = [...registrySource.matchAll(/^import \{ post\d+ \} from "\.\/posts\/post-(\d+)";/gm)].map(match => Number(match[1]));
  for (const id of existingFiles) {
    const source = await fs.readFile(path.join(process.cwd(), `src/lib/posts/post-${id}.tsx`), "utf8");
    if (source.includes(`bannerImage: ${JSON.stringify(image)}`)) throw new Error(`Cover already used by post-${id}.`);
  }
  const metadata = await sharp(path.join(process.cwd(), "public/images/blog", filename)).metadata();
  if (metadata.width !== 1200 || metadata.height !== 630) throw new Error("Editorial cover must be 1200x630 pixels.");
  return { bannerImage: image, bannerAlt: alt.trim() };
}
