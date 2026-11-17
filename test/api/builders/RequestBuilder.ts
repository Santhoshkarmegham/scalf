export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export interface RequestDefinition { method: HttpMethod; headers: Record<string, string>; query: Record<string, string | number | boolean>; body?: unknown; form?: Record<string, string>; }

export class RequestBuilder {
  private request: RequestDefinition = { method: 'GET', headers: {}, query: {} };
  public withMethod(method: HttpMethod): this { this.request.method = method; return this; }
  public withHeader(name: string, value: string): this { this.request.headers[name] = value; return this; }
  public withHeaders(headers: Record<string, string>): this { Object.assign(this.request.headers, headers); return this; }
  public withQueryParam(name: string, value: string | number | boolean): this { this.request.query[name] = value; return this; }
  public withQueryParams(query: Record<string, string | number | boolean>): this { Object.assign(this.request.query, query); return this; }
  public withBody(body: unknown): this { this.request.body = body; delete this.request.form; return this; }
  public withFormBody(form: Record<string, string>): this { this.request.form = form; delete this.request.body; return this; }
  public withBearerToken(token: string): this { return this.withHeader('Authorization', `Bearer ${token}`); }
  public build(): Readonly<RequestDefinition> { return structuredClone(this.request); }
}
