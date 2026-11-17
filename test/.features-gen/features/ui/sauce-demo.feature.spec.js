// Generated from: features/ui/sauce-demo.feature
import { test } from "../../../fixtures/testFixture.ts";

test.describe('Sauce Demo shopping', () => {

  test('Add a product to the cart', { tag: ['@smoke'] }, async ({ Given, When, Then, And, app, page }) => { 
    await Given('I open the Sauce Demo application', null, { app }); 
    await When('I log in with valid Sauce Demo credentials', null, { app }); 
    await And('I add the first product to the cart', null, { app }); 
    await Then('the shopping cart should contain one item', null, { app, page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/ui/sauce-demo.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":["@smoke"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I open the Sauce Demo application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I log in with valid Sauce Demo credentials","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"And I add the first product to the cart","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then the shopping cart should contain one item","stepMatchArguments":[]}]},
]; // bdd-data-end