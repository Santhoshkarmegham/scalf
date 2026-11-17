import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { getTestData } from '../utils/CommonMethods.js';

export class LoginPage extends BasePage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  public readonly inventoryHeading: Locator;

  public constructor(page: Page) {
    super(page);
    this.username = page.getByPlaceholder('Username');
    this.password = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.inventoryHeading = page.getByText('Products', { exact: true });
  }
  public async open(): Promise<void> { await this.navigate('/'); }
  public async login(username: string, password: string): Promise<void> {
    await this.fill(this.username, username);
    await this.fill(this.password, password);
    await this.click(this.loginButton);
  }
  public async loginWithValidCredentials(): Promise<void> {
    const data = getTestData<{ validUser: { username: string; password: string } }>();
    await this.login(data.validUser.username, data.validUser.password);
  }
}
