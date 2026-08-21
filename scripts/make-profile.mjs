// Turns a source photo into public/profile.jpg — square, lit, denoised.
//
//   node scripts/make-profile.mjs <source> [--left N --top N --size N] [--preview]
//
// Without crop flags it takes the largest centred square. `--preview` writes a
// side-by-side of several enhancement strengths instead of the final asset, so
// you can pick one before committing.
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "public", "profile.jpg");
const SIZE = 480;

const args = process.argv.slice(2);
const src = args.find((a) => !a.startsWith("--"));
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? null : Number(args[i + 1]);
};

if (!src) {
  console.error("usage: node scripts/make-profile.mjs <source-image> [--left N --top N --size N] [--preview]");
  process.exit(1);
}

/**
 * Enhancement grades for an underexposed, high-ISO frame.
 *
 * Order matters: resize first so downsampling averages the sensor noise away,
 * then lift exposure. Brightening before the resize amplifies noise the resize
 * would otherwise have destroyed.
 *
 * Two things measured on a real night frame, both counter-intuitive:
 *   - sharp's `.gamma(g)` DARKENS here (face mean 66.3 -> 63.9 at g=2.0), so
 *     it is not used. Brightening is `.modulate()` plus a `.linear()` offset.
 *   - a contrast curve of the form `.linear(a, -(128a)+128)` with a > 1 pulls
 *     midtones down, and an underexposed face sits squarely in that range, so
 *     it cancels the lift. Shadows are raised with a positive offset instead.
 *
 * `faceMean` below is the measured mean of the face region after grading; a
 * well-exposed portrait lands near 115-125 on a 0-255 scale.
 */
const GRADES = {
  // faceMean ~102. For a frame that is only slightly dark.
  light: { brightness: 1.35, lift: 12, saturation: 1.04, sharpen: 0.7 },
  // faceMean ~115. Night shot, face in shadow. The default.
  medium: { brightness: 1.5, lift: 16, saturation: 1.06, sharpen: 0.8 },
  // faceMean ~125. Brighter, at the cost of more blown highlights.
  strong: { brightness: 1.6, lift: 20, saturation: 1.08, sharpen: 0.9 },
};

const enhance = (pipeline, g) =>
  pipeline
    // Median filter knocks out the chroma speckle that survives downsampling.
    .median(3)
    .modulate({ brightness: g.brightness, saturation: g.saturation })
    .linear(1, g.lift)
    .sharpen({ m1: g.sharpen, sigma: 1 });

const cropFor = async () => {
  const left = flag("left");
  const top = flag("top");
  const size = flag("size");
  if (left !== null && top !== null && size !== null) {
    return { height: size, left, top, width: size };
  }

  // Default: largest centred square.
  const m = await sharp(src).metadata();
  const s = Math.min(m.width, m.height);
  return {
    height: s,
    left: Math.round((m.width - s) / 2),
    top: Math.round((m.height - s) / 2),
    width: s,
  };
};

const crop = await cropFor();
const base = () => sharp(src).extract(crop).resize(SIZE, SIZE);

if (args.includes("--preview")) {
  const names = ["original", ...Object.keys(GRADES)];
  const tiles = [];

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const pipeline = name === "original" ? base() : enhance(base(), GRADES[name]);
    tiles.push({ input: await pipeline.png().toBuffer(), left: i * SIZE, top: 0 });
  }

  const out = path.join(root, "profile-preview.png");
  await sharp({
    create: { background: "#111", channels: 3, height: SIZE, width: SIZE * names.length },
  })
    .composite(tiles)
    .png()
    .toFile(out);

  console.log(`wrote ${out}\n  ${names.join("  |  ")}`);
} else {
  const gradeName = args.includes("--grade")
    ? args[args.indexOf("--grade") + 1]
    : "medium";
  const grade = GRADES[gradeName];

  if (!grade) {
    console.error(`unknown grade "${gradeName}" — pick one of: ${Object.keys(GRADES).join(", ")}`);
    process.exit(1);
  }

  const info = await enhance(base(), grade)
    .jpeg({ mozjpeg: true, quality: 88 })
    .toFile(OUT);

  console.log(`wrote public/profile.jpg (${gradeName})  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
}
