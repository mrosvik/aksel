import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import path from "path";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: path.join(__dirname, "e2e"),

  /* Maximum time one test can run for. */
  timeout: 60 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  workers: 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
      ...(process.env.FULL_TEST
        ? { testMatch: [/.*\.e2e\.(ts|tsx)/, /smoketest.test.ts/] }
        : { testMatch: [/smoketest.test.ts/] }),
    },
    {
      name: "Safari",
      use: {
        ...devices["Desktop Safari"],
      },
      testMatch: [/smoketest.test.ts/],
    },
    {
      name: "Mobile",
      use: {
        ...devices["iPhone 12"],
      },
      testMatch: [/smoketest.test.ts/],
    },

    /* {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
      testMatch: /.*\.e2e\.(ts|tsx)/,
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
      testMatch: /.*\.e2e\.(ts|tsx)/,
    }, */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12,Pixel 5'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
