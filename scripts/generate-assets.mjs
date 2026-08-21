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
const URL_LABEL = "hareendra5555.github.io/portfolio_aug_2026";

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

  <!-- monogram -->
  <rect x="88" y="88" width="112" height="112" rx="26" fill="#0a0a0b"/>
  <g fill="none" stroke="#f4f4f5" stroke-width="4.5" stroke-linecap="square"
     transform="translate(88 88) scale(1.75)">
    <path d="M15 21v22M30 21v22M15 32h15"/>
    <path d="M38 43V21l11 22V21"/>
  </g>

  <text class="name" x="88" y="330">${NAME}</text>
  <text class="role" x="88" y="392">${ROLE}</text>
  <text class="tag"  x="88" y="452">${TAGLINE}</text>

  <line x1="88" y1="520" x2="1112" y2="520" stroke="#e4e4e7" stroke-width="2"/>
  <text class="url" x="88" y="566">${URL_LABEL}</text>
</svg>
`;

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

const fontFace = await embedFont();
const og = await sharp(Buffer.from(ogSvg(fontFace)), { density: 96 })
  .png()
  .toBuffer();
await writeFile(path.join(publicDir, "og.png"), og);
console.log("wrote public/og.png");
