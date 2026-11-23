/**
 * Converts source photos in /assets-src into responsive WebP files in /public/images
 * and writes a manifest (src/data/image-manifest.json) that the <Picture> component reads.
 *
 * Usage: npm run images
 * To add a real project photo: drop the JPG/PNG into assets-src/photos, run the script,
 * then reference it by file name (without extension) in src/data/projects.js.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const srcRoot = path.join(root, 'assets-src');
const outRoot = path.join(root, 'public', 'images');
const manifestPath = path.join(root, 'src', 'data', 'image-manifest.json');
const TARGET_WIDTHS = [480, 800, 1200, 1600];

fs.mkdirSync(outRoot, { recursive: true });
const manifest = {};

for (const folder of ['photos', 'instagram']) {
  const dir = path.join(srcRoot, folder);
  if (!fs.existsSync(dir)) continue;
  fs.mkdirSync(path.join(outRoot, folder), { recursive: true });
  for (const file of fs.readdirSync(dir)) {
    if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
    const name = file.replace(/\.[^.]+$/, '');
    const input = path.join(dir, file);
    const { width, height } = await sharp(input).metadata();
    const widths = TARGET_WIDTHS.filter((w) => w < width * 0.95);
    widths.push(width);
    for (const w of widths) {
      await sharp(input)
        .resize({ width: w })
        .webp({ quality: 80, effort: 5 })
        .toFile(path.join(outRoot, folder, `${name}-${w}.webp`));
    }
    // Tiny blurred placeholder used while the real image loads.
    const blur = await sharp(input).resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer();
    manifest[`${folder}/${name}`] = {
      base: `/images/${folder}/${name}`,
      widths,
      width,
      height,
      placeholder: `data:image/webp;base64,${blur.toString('base64')}`,
    };
    console.log(`${folder}/${name}  ${width}x${height}  -> ${widths.join(', ')}`);
  }
}

fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

// Brand: make transparent dark + light versions of the supplied logo (no redrawing).
const logoSrc = path.join(srcRoot, 'brand', 'logo-original.png');
if (fs.existsSync(logoSrc)) {
  const brandOut = path.join(root, 'public', 'brand');
  fs.mkdirSync(brandOut, { recursive: true });
  const trimmed = await sharp(logoSrc).flatten({ background: '#ffffff' }).trim({ threshold: 20 }).toBuffer();
  const { data, info } = await sharp(trimmed).greyscale().raw().toBuffer({ resolveWithObject: true });
  const makeVariant = async (rgb, file) => {
    const px = Buffer.alloc(info.width * info.height * 4);
    for (let i = 0; i < info.width * info.height; i++) {
      px[i * 4] = rgb[0];
      px[i * 4 + 1] = rgb[1];
      px[i * 4 + 2] = rgb[2];
      px[i * 4 + 3] = 255 - data[i]; // dark ink -> opaque, white paper -> transparent
    }
    await sharp(px, { raw: { width: info.width, height: info.height, channels: 4 } })
      .png()
      .toFile(path.join(brandOut, file));
  };
  await makeVariant([36, 37, 34], 'logo-dark.png');
  await makeVariant([255, 255, 255], 'logo-light.png');
  // Favicon: the monogram (left part of the logo) on ivory.
  const markWidth = Math.round(info.height * 0.95);
  await sharp(trimmed)
    .extract({ left: 0, top: 0, width: Math.min(markWidth, info.width), height: info.height })
    .resize(64, 64, { fit: 'contain', background: '#F7F5F0' })
    .flatten({ background: '#F7F5F0' })
    .png()
    .toFile(path.join(brandOut, 'favicon.png'));
  // Social share image from the hero photograph.
  await sharp(path.join(srcRoot, 'photos', 'residence-lounge.jpg'))
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82 })
    .toFile(path.join(brandOut, 'og-image.jpg'));
  console.log(`logo ${info.width}x${info.height}`);
}
