import { Page, Locator } from '@playwright/test'

export class ThankYouPage {
  private readonly page: Page
  private readonly heading: Locator
  private readonly subHeading: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.locator('xpath=//h1[normalize-space()="Thank You!"]')
    this.subHeading = page.locator('xpath=//h2[contains(@class,"text-center")]')
  }

  async waitForPage(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' })
  }

  async getSubHeadingText(): Promise<string> {
    return (await this.subHeading.textContent()) ?? ''
  }

  async isHeadingVisible(): Promise<boolean> {
    return await this.heading.isVisible()
  }
}
