import { test as base } from 'playwright-bdd';
import { getEnvironmentConfig } from '../utils/CommonMethods.js';
import { LoginPage } from '../pages/LoginPage.js';
import { ApiClient } from '../api/clients/ApiClient.js';
import { UserService } from '../api/services/UserService.js';

interface FrameworkFixtures {
  app: { loginPage: LoginPage };
  api: { userService: UserService };
}

export const test = base.extend<FrameworkFixtures>({
  app: async ({ page }, use) => { await use({ loginPage: new LoginPage(page) }); },
  api: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({ baseURL: getEnvironmentConfig().apiBaseUrl });
    await use({ userService: new UserService(new ApiClient(context)) });
    await context.dispose();
  },
});
export { expect } from '@playwright/test';
