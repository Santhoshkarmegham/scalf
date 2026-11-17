import { expect } from '@playwright/test';
import type { ActualResponse } from '../clients/ApiClient.js';

export class ApiResponseValidator {
  public static status(response: ActualResponse<unknown>, expected: number): void { expect(response.status).toBe(expected); }
  public static notEmpty(value: unknown): void { expect(value).not.toBeNull(); expect(value).not.toEqual(''); }
  public static propertyExists(value: unknown, property: string): void { expect(typeof value).toBe('object'); expect(value).toHaveProperty(property); }
  public static propertyEquals(value: unknown, property: string, expected: unknown): void { expect(value).toHaveProperty(property, expected); }
  public static array(value: unknown): asserts value is unknown[] { expect(Array.isArray(value)).toBe(true); }
  public static responseTime(response: ActualResponse<unknown>, maximumMs: number): void { expect(response.responseTimeMs).toBeLessThanOrEqual(maximumMs); }
  public static errorMessage(response: ActualResponse<unknown>, message: string): void { expect(response.body).toHaveProperty('message', message); }
  public static unauthorized(response: ActualResponse<unknown>): void { expect(response.status).toBe(401); }
}
