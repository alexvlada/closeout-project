import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',          // folder gde su tvoji testovi
  timeout: 30000,
  expect: {
    timeout: 10000
  },
  reporter: 'list',
  use: {
    headless: false,           // za --headed test
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true
  },
  projects: [
    {
      name: 'ui',
      testMatch: /tests\/ui\/.*\.spec\.ts/,
    //  use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'api',
      testMatch: /tests\/api\/.*\.spec\.ts/,
      dependencies: ['ui']
    }
  ]
});