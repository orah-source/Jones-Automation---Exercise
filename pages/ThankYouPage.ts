import { Page, Locator } from '@playwright/test'

export class ThankYouPage {
  private readonly page: Page
  private readonly heading: Locator
  private readonly subHeading: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { name: 'Thank You!', level: 1 })
    this.subHeading = page.locator('h2.text-center')
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
