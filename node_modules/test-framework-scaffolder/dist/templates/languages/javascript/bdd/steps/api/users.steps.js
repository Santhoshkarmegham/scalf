import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/testFixture.js';
const { When, Then } = createBdd(test);
When('I request the users collection', async ({ api }) => { await api.userService.requestUsers(); });
Then('the users response is successful', ({ api }) => { api.userService.verifyUsersResponse(); });
