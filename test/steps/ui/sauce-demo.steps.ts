import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../fixtures/testFixture.js';

const { Given, When, Then } = createBdd(test);

Given('I open the Sauce Demo application', async ({ app }) => {
  await app.sauceDemoPage.open();
});

When('I log in with valid Sauce Demo credentials', async ({ app }) => {
  await app.sauceDemoPage.loginWithValidCredentials();
  await expect(app.sauceDemoPage.inventoryHeading).toBeVisible();
});

When('I add the first product to the cart', async ({ app }) => {
  await app.sauceDemoPage.addFirstProductToCart();
});

Then('the shopping cart should contain one item', async ({ app, page }) => {
  await expect(app.sauceDemoPage.cartBadge).toHaveText('1');
  await app.sauceDemoPage.openCart();
  await expect(page).toHaveURL(/cart\.html/);
});
