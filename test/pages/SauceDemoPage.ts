import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { getTestData } from '../utils/CommonMethods.js';

export class SauceDemoPage extends BasePage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  private readonly addBackpackToCart: Locator;
  private readonly cartLink: Locator;
  public readonly inventoryHeading: Locator;
  public readonly cartBadge: Locator;

  public constructor(page: Page) {
    super(page);
    this.username = page.getByPlaceholder('Username');
    this.password = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.inventoryHeading = page.getByText('Products', { exact: true });
    this.addBackpackToCart = page.getByRole('button', { name: 'Add to cart', exact: true }).first();
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  public async open(): Promise<void> {
    await this.navigate('/');
  }

  public async loginWithValidCredentials(): Promise<void> {
    const data = getTestData<{ validUser: { username: string; password: string } }>();
    await this.fill(this.username, data.validUser.username);
    await this.fill(this.password, data.validUser.password);
    await this.click(this.loginButton);
  }

  public async addFirstProductToCart(): Promise<void> {
    await this.click(this.addBackpackToCart);
  }

  public async openCart(): Promise<void> {
    await this.click(this.cartLink);
  }
}
