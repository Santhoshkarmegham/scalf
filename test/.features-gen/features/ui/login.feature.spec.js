// Generated from: features/ui/login.feature
import { test } from "../../../fixtures/testFixture.ts";

test.describe('Login', () => {

  test('Successful login', { tag: ['@smoke'] }, async ({ Given, When, Then, app }) => { 
    await Given('I navigate to the application', null, { app }); 
    await When('I login with valid credentials', null, { app }); 
    await Then('I should see the inventory page', null, { app }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/ui/login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":["@smoke"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I navigate to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I login with valid credentials","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should see the inventory page","stepMatchArguments":[]}]},
]; // bdd-data-end