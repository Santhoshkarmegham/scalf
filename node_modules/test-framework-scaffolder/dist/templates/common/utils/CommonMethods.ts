import 'dotenv/config';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import runConfigJson from '../config/run.config.json' with { type: 'json' };

export type Environment = string;
export interface EnvironmentConfig { baseUrl: string; apiBaseUrl: string; }
export interface RunConfig {
  environment: Environment; timeout: number; actionTimeout: number; navigationTimeout: number;
  headless: boolean; retries: number; ciRetries: number; fullyParallel: boolean; workers: number | null;
}

function validateRunConfig(value: unknown): RunConfig {
  if (typeof value !== 'object' || value === null) throw new Error('config/run.config.json must contain a JSON object.');
  const config = value as Record<string, unknown>;
  for (const key of ['timeout', 'actionTimeout', 'navigationTimeout', 'retries', 'ciRetries']) {
    const field = config[key];
    if (typeof field !== 'number' || field < 0) throw new Error(`run.config.json: "${key}" must be a non-negative number.`);
  }
  if (typeof config.headless !== 'boolean' || typeof config.fullyParallel !== 'boolean') throw new Error('run.config.json: "headless" and "fullyParallel" must be boolean values.');
  if (config.workers !== null && (typeof config.workers !== 'number' || config.workers < 1)) throw new Error('run.config.json: "workers" must be null or a positive number.');
  if (typeof config.environment !== 'string' || !config.environment.trim()) throw new Error('run.config.json: "environment" must be a non-empty string.');
  return config as unknown as RunConfig;
}

const runConfig = validateRunConfig(runConfigJson);
export function getRunConfig(): Readonly<RunConfig> { return runConfig; }
export function getAvailableEnvironments(): string[] { return readdirSync(resolve('test-data')).filter(file => file.endsWith('.json')).map(file => file.slice(0, -5)).sort(); }
export function getEnvironment(): Environment {
  const requested = process.argv.find(value => value.startsWith('--env='))?.slice(6) ?? process.env.TEST_ENV ?? runConfig.environment;
  const available = getAvailableEnvironments();
  if (!available.includes(requested)) throw new Error(`Unknown TEST_ENV "${requested}".\nAvailable environments:\n${available.map(value => `- ${value}`).join('\n')}`);
  return requested;
}
export function getTestData<T>(): T {
  const path = resolve('test-data', `${getEnvironment()}.json`);
  try { return JSON.parse(readFileSync(path, 'utf8')) as T; }
  catch (error) { throw new Error(`Unable to load test data from ${path}: ${error instanceof Error ? error.message : String(error)}`, { cause: error }); }
}
export function getKeyedTestData<T>(group: string): Record<string, T> {
  const value = getTestData<Record<string, unknown>>()[group];
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`Test-data group "${group}" was not found.`);
  return value as Record<string, T>;
}
export function getEnvironmentConfig(): EnvironmentConfig {
  const data = getTestData<Record<string, unknown>>();
  return { baseUrl: typeof data.baseUrl === 'string' ? data.baseUrl : 'https://www.saucedemo.com', apiBaseUrl: typeof data.apiBaseUrl === 'string' ? data.apiBaseUrl : 'https://jsonplaceholder.typicode.com' };
}
