// Rasterizes the brand SVGs into the PNG sizes the manifest and metadata
// reference, and renders the static Open Graph card.
//
//   node scripts/generate-assets.mjs
//
// Outputs are committed, so this only needs re-running when the mark or the
// headline copy changes.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");

const NAME = "Hareendra Nerusu";
const ROLE = "Software Engineer";
const TAGLINE = "Backend · Cloud · Agentic AI";
const URL_LABEL = "hareendra5555.github.io/portfolio";

/** Geist ships with the repo, so the card renders identically everywhere. */
const embedFont = async () => {
  const [regular, bold] = await Promise.all([
    readFile(path.join(publicDir, "fonts", "Geist-Regular.ttf")),
    readFile(path.join(publicDir, "fonts", "Geist-Bold.ttf")),
  ]);

  return `
    @font-face {
      font-family: 'Geist';
      font-weight: 400;
      src: url('data:font/ttf;base64,${regular.toString("base64")}');
    }
    @font-face {
      font-family: 'Geist';
      font-weight: 700;
      src: url('data:font/ttf;base64,${bold.toString("base64")}');
    }
  `;
};

const ogSvg = (fontFace) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <style>
    ${fontFace}
    .name { font-family: 'Geist', 'DejaVu Sans', 'Liberation Sans', Arial, sans-serif; font-weight: 700; font-size: 78px; fill: #0a0a0b; }
    .role { font-family: 'Geist', 'DejaVu Sans', 'Liberation Sans', Arial, sans-serif; font-weight: 400; font-size: 38px; fill: #52525b; }
    .tag  { font-family: 'Geist', 'DejaVu Sans', 'Liberation Sans', Arial, sans-serif; font-weight: 400; font-size: 30px; fill: #71717a; letter-spacing: 1px; }
    .url  { font-family: 'Geist', 'DejaVu Sans', 'Liberation Sans', Arial, sans-serif; font-weight: 400; font-size: 26px; fill: #a1a1aa; }
  </style>

  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="1200" height="8" fill="#0a0a0b"/>

  <text class="name" x="88" y="330">${NAME}</text>
  <text class="role" x="88" y="392">${ROLE}</text>
  <text class="tag"  x="88" y="452">${TAGLINE}</text>

  <line x1="88" y1="520" x2="1112" y2="520" stroke="#e4e4e7" stroke-width="2"/>
  <text class="url" x="88" y="566">${URL_LABEL}</text>
</svg>
`;

/** Circular crop of the profile photo, for the card's portrait. */
const circularPortrait = async (size) => {
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`
  );

  return await sharp(path.join(publicDir, "profile.jpg"))
    .resize(size, size, { fit: "cover" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
};

const iconSvg = await readFile(path.join(publicDir, "favicon.svg"));

const pngTargets = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

for (const { name, size } of pngTargets) {
  await sharp(iconSvg, { density: 512 })
    .resize(size, size)
    .png()
    .toFile(path.join(publicDir, name));
  console.log(`wrote public/${name}`);
}

const PORTRAIT_SIZE = 150;
const fontFace = await embedFont();
const card = await sharp(Buffer.from(ogSvg(fontFace)), { density: 96 })
  .png()
  .toBuffer();
const og = await sharp(card)
  .composite([
    { input: await circularPortrait(PORTRAIT_SIZE), left: 88, top: 88 },
  ])
  .png()
  .toBuffer();
await writeFile(path.join(publicDir, "og.png"), og);
console.log("wrote public/og.png");
