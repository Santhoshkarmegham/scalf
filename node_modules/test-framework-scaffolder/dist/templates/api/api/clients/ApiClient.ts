import type { APIRequestContext } from '@playwright/test';
import type { RequestDefinition } from '../builders/RequestBuilder.js';

export interface ActualResponse<T> { status: number; headers: Record<string, string>; body: T; responseTimeMs: number; }

export class ApiClient {
  public constructor(private readonly context: APIRequestContext) {}
  public async execute<T>(path: string, request: Readonly<RequestDefinition>): Promise<ActualResponse<T>> {
    const started = performance.now();
    const response = await this.context.fetch(path, {
      method: request.method, headers: request.headers, params: request.query,
      ...(request.body !== undefined ? { data: request.body } : {}),
      ...(request.form !== undefined ? { form: request.form } : {}),
    });
    const text = await response.text();
    const contentType = response.headers()['content-type'] ?? '';
    let parsed: unknown;
    if (!text) parsed = undefined;
    else if (contentType.includes('json')) {
      try { parsed = JSON.parse(text) as unknown; }
      catch (error) { throw new Error(`API response declared JSON but could not be parsed: ${error instanceof Error ? error.message : String(error)}`, { cause: error }); }
    } else parsed = text;
    const body = parsed as T;
    return { status: response.status(), headers: response.headers(), body, responseTimeMs: performance.now() - started };
  }
}
