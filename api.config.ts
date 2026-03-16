import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
    timeout: 100000,
    testDir: 'tests/api',
    retries: 0,
    use: {
      headless: true,
      viewport: { width: 1280, height: 720 },
      actionTimeout: 10000,
      ignoreHTTPSErrors: true,
      video: 'off',
      screenshot: 'off'
    },
}

export default config