import { rename } from 'node:fs/promises';
await rename('reports/index.html', 'reports/allure-report.html');
