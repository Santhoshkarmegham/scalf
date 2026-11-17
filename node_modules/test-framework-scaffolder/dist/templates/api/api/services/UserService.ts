import type { ActualResponse, ApiClient } from '../clients/ApiClient.js';
import { RequestBuilder } from '../builders/RequestBuilder.js';
import type { UserRequest } from '../models/requests/UserRequest.js';
import type { UserResponse } from '../models/responses/UserResponse.js';
import { ApiResponseValidator } from '../validators/ApiResponseValidator.js';
import { getTestData } from '../../utils/CommonMethods.js';

export class UserService {
  private usersResponse?: ActualResponse<UserResponse[]>;
  public constructor(private readonly client: ApiClient) {}
  public getUsers(): Promise<ActualResponse<UserResponse[]>> { return this.client.execute('/users', new RequestBuilder().withMethod('GET').build()); }
  public getUser(id: number): Promise<ActualResponse<UserResponse>> { return this.client.execute(`/users/${id}`, new RequestBuilder().withMethod('GET').build()); }
  public createUser(user: UserRequest): Promise<ActualResponse<UserResponse>> { return this.client.execute('/users', new RequestBuilder().withMethod('POST').withBody(user).build()); }
  public async verifyUsersAvailable(): Promise<void> {
    await this.requestUsers();
    this.verifyUsersResponse();
  }
  public async requestUsers(): Promise<void> { this.usersResponse = await this.getUsers(); }
  public verifyUsersResponse(): void {
    const response = this.usersResponse;
    if (!response) throw new Error('Users must be requested before the response is verified.');
    ApiResponseValidator.status(response, getTestData<{ apiExpectedStatus: number }>().apiExpectedStatus);
    ApiResponseValidator.array(response.body);
    ApiResponseValidator.notEmpty(response.body);
  }
}
