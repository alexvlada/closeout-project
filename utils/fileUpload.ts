import fs from 'fs';
import path from 'path';
import { Locator } from '@playwright/test';

export async function uploadUniqueFile(locator: Locator, fileName: string) {

  const filePath = path.resolve(__dirname, '../test-data', fileName);
  const buffer = fs.readFileSync(filePath);
  const timestamp = Date.now();
  const randomId = Math.floor(Math.random() * 10000);
  const ext = path.extname(fileName);

  const uniqueName = `upload_${timestamp}_${randomId}${ext}`;

  await locator.setInputFiles({
    name: uniqueName,
    mimeType: 'image/png',
    buffer
  });
}