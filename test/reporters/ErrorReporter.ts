import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import type { FullResult, Reporter, TestCase, TestResult } from '@playwright/test/reporter';

export default class ErrorReporter implements Reporter {
  public onBegin(): void {
    mkdirSync('reports', { recursive: true });
    writeFileSync('reports/errors.log', `Playwright execution started: ${new Date().toISOString()}\n`);
  }

  public onTestBegin(test: TestCase): void {
    console.log(`[TEST] ${test.titlePath().join(' > ')}`);
  }

  public onTestEnd(test: TestCase, result: TestResult): void {
    console.log(`[${result.status === 'passed' ? 'PASS' : 'FAIL'}] ${test.title}`);
    if (result.status === 'passed') return;
    const errors = result.errors.map(error => error.stack ?? error.message).join('\n');
    const attachments = result.attachments.map(item => `${item.name}: ${item.path ?? 'embedded'}`).join('\n');
    appendFileSync('reports/errors.log', `\n[${result.status.toUpperCase()}] ${test.titlePath().join(' > ')}\n${errors}\n${attachments}\n`);
  }

  public onEnd(result: FullResult): void {
    appendFileSync('reports/errors.log', `\nExecution finished: ${result.status} at ${new Date().toISOString()}\n`);
  }
}
