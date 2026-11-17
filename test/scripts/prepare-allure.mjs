import { mkdir, writeFile } from 'node:fs/promises';
const properties = {
  Environment: process.env.TEST_ENV ?? 'smoke', Browser: process.env.BROWSER ?? 'chromium',
  Framework: 'Playwright-TypeScript (bdd)', 'Test-Type': 'ui-api',
  'Node-Version': process.version, Execution: process.env.GITHUB_ACTIONS ? 'GitHub Actions' : 'Local',
  'Execution-Date': new Date().toISOString(), ...(process.env.GITHUB_RUN_ID ? { 'CI-Run-ID': process.env.GITHUB_RUN_ID } : {}),
};
await mkdir('allure-results', { recursive: true });
await writeFile('allure-results/environment.properties', Object.entries(properties).map(([key, value]) => `${key}=${value}`).join('\n'));
