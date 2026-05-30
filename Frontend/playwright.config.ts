import { defineConfig, devices } from "@playwright/test";

const slowMo = Number(process.env.E2E_SLOW_MO || 0);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:8080",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    launchOptions: slowMo > 0 ? { slowMo } : undefined,
  },
  projects: [
    {
      name: "app-web-chromium",
      use: {
        ...devices["Desktop Chrome"],
        userAgent: undefined,
      },
    },
  ],
});
