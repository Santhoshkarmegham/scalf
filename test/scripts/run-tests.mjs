import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
const args = process.argv.slice(2);
const envArg = args.find(value => value.startsWith('--env='));
const positionalEnvironment = args.find(value => !value.startsWith('-') && existsSync(resolve('test-data', `${value}.json`)));
const tagWithValue = args.find(value => value.startsWith('--tag=') || value.startsWith('--tags='));
const tagFlagIndex = args.findIndex(value => value === '--tag' || value === '--tags');
const tagExpression = tagWithValue?.slice(tagWithValue.indexOf('=') + 1) ?? (tagFlagIndex >= 0 ? args[tagFlagIndex + 1] : undefined);
const filtered = args.filter((value, index) => value !== envArg && value !== positionalEnvironment && value !== tagWithValue && (tagFlagIndex < 0 || (index !== tagFlagIndex && index !== tagFlagIndex + 1)));
const selectedEnvironment = envArg?.slice(6) ?? positionalEnvironment ?? process.env.TEST_ENV;
const env = { ...process.env, ...(selectedEnvironment ? { TEST_ENV: selectedEnvironment } : {}) };
console.log(`[RUN] Framework: bdd | Test type: ui-api`);
console.log(`[RUN] Environment: ${selectedEnvironment ?? 'from config/run.config.json'}`);
console.log(`[RUN] Scope: ${process.env.TEST_SCOPE ?? 'all selected tests'}`);
if (tagExpression) console.log(`[RUN] Tag filter: ${tagExpression}`);
spawnSync(process.execPath, ['scripts/prepare-allure.mjs'], { stdio: 'inherit', env });

const runner = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const bddArgs = ['bddgen', 'test', ...(tagExpression ? ['--tags', tagExpression] : [])];
const pre = spawnSync(runner, bddArgs, { stdio: 'inherit', env });
if (pre.status !== 0) process.exit(pre.status ?? 1);

console.log('[RUN] Starting Playwright tests...');
const playwrightArgs = tagExpression && 'bdd' !== 'bdd' ? ['--grep', tagExpression, ...filtered] : filtered;
const result = spawnSync(runner, ['playwright', 'test', ...playwrightArgs], { stdio: 'inherit', env });
if (result.status === 0) console.log('[RUN] Test execution completed successfully.');
else console.error(`[ERROR] Test execution failed with exit code ${result.status ?? 1}. See reports/errors.log and test-results/ traces.`);
process.exit(result.status ?? 1);
