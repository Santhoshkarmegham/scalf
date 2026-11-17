import { rm } from 'node:fs/promises';
for (const path of ['playwright-report', 'test-results', 'allure-results', 'allure-report', 'reports', '.features-gen']) await rm(path, { recursive: true, force: true });
