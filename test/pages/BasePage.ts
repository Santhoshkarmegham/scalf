import type { Locator, Page } from "@playwright/test";

export class BasePage {
  public constructor(protected readonly page: Page) {}
  public async navigate(path = "/"): Promise<void> {
    await this.page.goto(path);
  }
  public async click(locator: Locator): Promise<void> {
    await locator.click();
  }
  public async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }
  public async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? "";
  }
  public async waitForElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: "visible" });
  }
  public async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }
}
