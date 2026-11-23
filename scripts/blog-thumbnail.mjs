import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const palette = ["#38bdf8", "#a78bfa", "#34d399", "#fb923c", "#f472b6", "#60a5fa", "#facc15"];

function xml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

function linesFor(title) {
  const lines = [];
  for (const word of title.split(/\s+/)) {
    if (!lines.length || `${lines.at(-1)} ${word}`.length > 27) lines.push(word);
    else lines[lines.length - 1] += ` ${word}`;
  }
  return lines.slice(0, 4);
}

function motifFor(title, color) {
  const t = title.toLowerCase();
  if (/two.page|one.page|how many pages|how long should/.test(t)) {
    return `<rect x="15" y="8" width="104" height="132" rx="9" fill="white" stroke="${color}" stroke-width="6"/>
      <rect x="48" y="23" width="104" height="132" rx="9" fill="#dce9fa" stroke="${color}" stroke-width="6"/>
      <path d="M67 61h61M67 82h61M67 103h46" stroke="#6381a4" stroke-width="8" stroke-linecap="round"/>`;
  }
  if (/data|analyst|science|score|metric/.test(t)) {
    return `<path d="M12 150V35M12 150h155" stroke="#8ca7c5" stroke-width="6" stroke-linecap="round"/>
      <rect x="29" y="100" width="26" height="50" rx="5" fill="${color}"/>
      <rect x="72" y="66" width="26" height="84" rx="5" fill="${color}" opacity=".8"/>
      <rect x="115" y="32" width="26" height="118" rx="5" fill="${color}" opacity=".6"/>`;
  }
  if (/cyber|security/.test(t)) {
    return `<path d="M86 11 153 39v48c0 47-32 69-67 83-35-14-67-36-67-83V39L86 11Z" fill="${color}" opacity=".92"/>
      <rect x="59" y="79" width="54" height="43" rx="8" fill="#10213c"/><path d="M70 79V65a16 16 0 0 1 32 0v14" fill="none" stroke="#10213c" stroke-width="9"/>`;
  }
  if (/cover letter|letter vs/.test(t)) {
    return `<rect x="8" y="40" width="158" height="105" rx="12" fill="${color}"/>
      <path d="m12 48 75 57 75-57" fill="none" stroke="#10213c" stroke-width="8"/><path d="M16 139 69 95m89 44-53-44" stroke="#10213c" stroke-width="6"/>`;
  }
  if (/\bai\b|prompt|chatgpt|smart/.test(t)) {
    return `<path d="m88 15 16 45 46 17-46 17-16 45-17-45-45-17 45-17 17-45Z" fill="${color}"/>
      <path d="m142 122 7 20 20 7-20 7-7 20-7-20-20-7 20-7 7-20Z" fill="#b7d6ef"/>`;
  }
  if (/career change|remote|freelance|employment gap/.test(t)) {
    return `<path d="M12 133h70c24 0 35-18 35-36V45" fill="none" stroke="${color}" stroke-width="15" stroke-linecap="round"/>
      <path d="m79 77 38-38 38 38" fill="none" stroke="${color}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  if (/keyword|skills|action verb/.test(t)) {
    return `<rect x="7" y="19" width="111" height="35" rx="17" fill="${color}"/>
      <rect x="43" y="72" width="126" height="35" rx="17" fill="${color}" opacity=".75"/>
      <rect x="7" y="125" width="95" height="35" rx="17" fill="${color}" opacity=".55"/>`;
  }
  if (/software|devops|engineer|technology/.test(t)) {
    return `<path d="m61 37-47 47 47 47M113 37l47 47-47 47" fill="none" stroke="${color}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M102 19 72 149" stroke="#8ca7c5" stroke-width="10" stroke-linecap="round"/>`;
  }
  return `<rect x="28" y="12" width="122" height="148" rx="11" fill="#e9f2fc" stroke="${color}" stroke-width="6"/>
    <path d="M51 48h76M51 71h76M51 94h76M51 117h53" stroke="#8ca7c5" stroke-width="9" stroke-linecap="round"/>`;
}

export async function createBlogThumbnail({ id, slug, title, category }) {
  if (!Number.isSafeInteger(id) || id < 1 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !title?.trim()) {
    throw new Error("Invalid blog thumbnail metadata.");
  }
  const color = palette[id % palette.length];
  const titleLines = linesFor(title);
  const fontSize = titleLines.length > 3 ? 42 : 48;
  const startY = titleLines.length > 3 ? 174 : 195;
  const titleSvg = titleLines.map((line, index) =>
    `<text x="70" y="${startY + index * (fontSize + 13)}" fill="#ffffff" font-size="${fontSize}" font-weight="700" font-family="Arial, Helvetica, sans-serif">${xml(line)}</text>`
  ).join("\n");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0a1730"/><stop offset="1" stop-color="#1b3155"/></linearGradient>
      <radialGradient id="glow"><stop stop-color="${color}" stop-opacity=".26"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>
      <filter id="shadow"><feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#020617" flood-opacity=".32"/></filter>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <circle cx="1030" cy="380" r="420" fill="url(#glow)"/>
    <path d="M0 536c170-80 351-18 520-75 166-55 238-36 440 65" fill="none" stroke="${color}" stroke-opacity=".12" stroke-width="3"/>
    <rect x="70" y="62" width="10" height="40" rx="5" fill="${color}"/>
    <text x="99" y="91" fill="${color}" font-size="22" font-weight="700" letter-spacing="2" font-family="Arial, Helvetica, sans-serif">${xml(category.toUpperCase())}</text>
    ${titleSvg}
    <rect x="70" y="536" width="600" height="2" fill="#6680a5" opacity=".55"/>
    <text x="70" y="580" fill="#b8cbe4" font-size="21" font-weight="700" letter-spacing="2" font-family="Arial, Helvetica, sans-serif">SMART RESUME MAKER</text>
    <g filter="url(#shadow)"><rect x="850" y="112" width="270" height="398" rx="20" fill="#f8fbff" transform="rotate(5 985 311)"/></g>
    <g transform="translate(899 164)"><rect x="0" y="0" width="172" height="172" rx="24" fill="#e9f2fc"/>
      <g transform="translate(0 1)">${motifFor(title, color)}</g>
      <path d="M9 210h150M9 234h135M9 258h147M9 282h115" stroke="#b5c9df" stroke-width="11" stroke-linecap="round"/>
    </g>
    <circle cx="1120" cy="75" r="18" fill="${color}" opacity=".7"/>
  </svg>`;
  const destination = path.join(process.cwd(), "public", "images", "blog", `post-${id}-${slug}.jpg`);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 86, mozjpeg: true }).toFile(destination);
  return `/images/blog/post-${id}-${slug}.jpg`;
}
