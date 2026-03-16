import { test, expect, request } from '@playwright/test';
import { createUniqueImage } from '../../utils/imageHelper';
import path from 'path';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Placeholder Photo API', () => {
  let apiContext: any;
  let accessToken: string;

  test.beforeAll(async () => {
    apiContext = await request.newContext();
    const tokenPath = 'regions/oauth2/token'
    const authResponse = await apiContext.post(
      process.env.API_BASE_URL! + tokenPath,
      {
        headers: { 'Content-Type': 'application/json' },
        data: {
          deviceId: process.env.DEVICE_ID!,
          username: process.env.APP_USERNAME!,
          password: process.env.APP_PASSWORD!
        }
      }
    );

    console.log('Auth status:', authResponse.status());
    expect(authResponse.status()).toBe(200);

    const authBody = await authResponse.json();
    const token = authBody[0]?.tokens?.[0]?.access_token;
    if (!token) throw new Error('Access token not found in response');

    accessToken = token;
  });

test('Upload placeholder photo - successful', async ({ request }) => {

  const uniqueImage = await createUniqueImage('no-hardhat.png');
  const filePath = path.resolve(__dirname, uniqueImage); 
  if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);
  const fileBuffer = fs.readFileSync(filePath); 
  const locationId = '7964'
  const leafId = '121050'
  const comment = 'Upload photo'
  const uploadPath = process.env.API_BASE_URL!+'control-panel/api/placeholders/photos/upload?leafId='+leafId+'&locationId='+locationId+'&comment='+comment
  
  const response = await request.post(uploadPath,
   {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Authorization': `Bearer ${accessToken}`
      },
      data: fileBuffer
    }
  );

  console.log('Response status:', response.status());
  console.log(await response.text());

  expect(response.ok()).toBeTruthy();
});

test('Upload placeholder photo - Unauthorized', async ({ request }) => {

  const uniqueImage = await createUniqueImage('no-hardhat.png');
  const filePath = path.resolve(__dirname, uniqueImage); 
  if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);
  const fileBuffer = fs.readFileSync(filePath); 
  const locationId = '7964'
  const leafId = '121050'
  const comment = 'Upload photo'
  const uploadPath = process.env.API_BASE_URL!+'control-panel/api/placeholders/photos/upload?leafId='+leafId+'&locationId='+locationId+'&comment='+comment
  
  const response = await request.post(uploadPath,
   {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      data: fileBuffer
    }
  );

  console.log('Response status:', response.status());
  console.log(await response.text());
  expect(response.status()).toBe(401);
});

test('Upload placeholder photo - Not Found', async ({ request }) => {

  const uniqueImage = await createUniqueImage('no-hardhat.png');
  const filePath = path.resolve(__dirname, uniqueImage); 
  if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);
  const fileBuffer = fs.readFileSync(filePath); 
  const locationId = '7964'
  const leafId = '121050'
  const comment = 'Upload photo'
  const uploadPath = process.env.API_BASE_URL!+'xyz'
  
  const response = await request.post(uploadPath,
   {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Authorization': `Bearer ${accessToken}`
      },
      data: fileBuffer
    }
  );

  console.log('Response status:', response.status());
  console.log(await response.text());
  expect(response.status()).toBe(404);
});

});