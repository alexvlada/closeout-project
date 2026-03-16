import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export async function createUniqueImage(filename: string): Promise<string> {

  const inputPath = path.join(process.cwd(), 'test-data', filename);

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Original file does not exist: ${inputPath}`);
  }

  const tmpDir = path.join(process.cwd(), 'tmp');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  const uniqueName = `img_${Date.now()}_${Math.floor(Math.random() * 10000)}.png`;
  const outputPath = path.join(tmpDir, uniqueName);

  // promeni 1 pixel (random)
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  const width = metadata.width || 1000;
  const height = metadata.height || 1000;

  const randomX = Math.floor(Math.random() * width);
  const randomY = Math.floor(Math.random() * height);

  const pixel = Buffer.from([
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    255
  ]);

  await image
    .composite([
      {
        input: pixel,
        raw: { width: 1, height: 1, channels: 4 },
        left: randomX,
        top: randomY
      }
    ])
    .toFile(outputPath);

  return outputPath;
}