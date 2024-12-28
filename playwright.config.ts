import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000, 
  retries: 0, 
  use: {
    baseURL: 'http://localhost:5173', 
    headless: true, 
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev', 
    port: 5173, 
    timeout: 120 * 1000, 
    reuseExistingServer: !process.env.CI, 
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    }
  ],
});