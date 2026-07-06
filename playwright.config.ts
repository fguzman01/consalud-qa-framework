import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  workers: 1,
  reporter: [['html'], ['allure-playwright']],

  use: {
    baseURL: 'https://www.demoblaze.com/index.html',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
        name: 'chromium',
        use: { 
            ...devices['Desktop Chrome'],
            launchOptions: {
                slowMo: 1000,
            }
        },
    },
]
});