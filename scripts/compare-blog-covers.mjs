import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const registry = await fs.readFile("src/lib/blog-data.tsx", "utf8");
const ids = [...registry.matchAll(/^\s+post(\d+),\s*$/gm)].map(match => Number(match[1]));
const covers = [];

for (const id of ids) {
  const post = await fs.readFile(`src/lib/posts/post-${id}.tsx`, "utf8");
  const image = post.match(/^\s*bannerImage:\s*["']([^"']+)["']/m)?.[1];
  if (!image) throw new Error(`No cover for post-${id}`);
  const pixels = await sharp(path.join("public", image)).resize(9, 8).greyscale().raw().toBuffer();
  let hash = 0n;
  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      hash = (hash << 1n) | BigInt(pixels[row * 9 + column] > pixels[row * 9 + column + 1] ? 1 : 0);
    }
  }
  covers.push({ id, image, hash });
}

function distance(a, b) {
  let bits = a ^ b;
  let count = 0;
  while (bits) { count += Number(bits & 1n); bits >>= 1n; }
  return count;
}

const pairs = [];
for (let a = 0; a < covers.length; a++) {
  for (let b = a + 1; b < covers.length; b++) {
    pairs.push({ a: covers[a], b: covers[b], distance: distance(covers[a].hash, covers[b].hash) });
  }
}
pairs.sort((a, b) => a.distance - b.distance);
console.log(`Closest perceptual cover pairs among ${covers.length} published posts:`);
for (const pair of pairs.slice(0, 10)) console.log(`post-${pair.a.id} / post-${pair.b.id}: ${pair.distance}/64`);
