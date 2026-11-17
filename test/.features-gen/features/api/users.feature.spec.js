// Generated from: features/api/users.feature
import { test } from "../../../fixtures/testFixture.ts";

test.describe('Users API', () => {

  test('Retrieve users', { tag: ['@api'] }, async ({ When, Then, api }) => { 
    await When('I request the users collection', null, { api }); 
    await Then('the users response is successful', null, { api }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/api/users.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":["@api"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Action","textWithKeyword":"When I request the users collection","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Outcome","textWithKeyword":"Then the users response is successful","stepMatchArguments":[]}]},
]; // bdd-data-end