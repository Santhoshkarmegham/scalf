import { defineBddConfig } from 'playwright-bdd';
export const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: ['steps/**/*.ts', 'fixtures/testFixture.ts'],
  outputDir: '.features-gen',
});
