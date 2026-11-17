import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../fixtures/testFixture.js';
const { Given, When, Then } = createBdd(test);
Given('I navigate to the application', async ({ app }) => { await app.loginPage.open(); });
When('I login with valid credentials', async ({ app }) => { await app.loginPage.loginWithValidCredentials(); });
Then('I should see the inventory page', async ({ app }) => { await expect(app.loginPage.inventoryHeading).toBeVisible(); });
