import { Page, Locator } from '@playwright/test'
import * as path from 'path'
import * as fs from 'fs'
import { TestData } from '../config/config'

export class FormPage {
  private readonly page: Page
  private readonly nameInput: Locator
  private readonly emailInput: Locator
  private readonly phoneInput: Locator
  private readonly companyInput: Locator
  private readonly websiteInput: Locator
  private readonly employeesDropdown: Locator
  private readonly submitButton: Locator

  constructor(page: Page) {
    this.page = page
    this.nameInput = page.locator('xpath=//input[@id="name"]')
    this.emailInput = page.locator('xpath=//input[@id="email"]')
    this.phoneInput = page.locator('xpath=//input[@id="phone"]')
    this.companyInput = page.locator('xpath=//input[@id="company"]')
    this.websiteInput = page.locator('xpath=//input[@id="website"]')
    this.employeesDropdown = page.locator('xpath=//select[@id="employees"]')
    this.submitButton = page.locator('xpath=//button[normalize-space()="Request a call back"]')
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url)
    await this.nameInput.waitFor({ state: 'visible' })
  }

  async fillForm(data: TestData): Promise<void> {
    await this.nameInput.fill(data.name)
    await this.emailInput.fill(data.email)
    await this.phoneInput.fill(data.phone)
    await this.companyInput.fill(data.company)
    await this.websiteInput.fill(data.website)
    await this.employeesDropdown.selectOption({ label: data.employees })
  }

  async takeScreenshot(screenshotPath: string): Promise<void> {
    const dir = path.dirname(screenshotPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    await this.page.screenshot({ path: screenshotPath })
  }

  async submit(): Promise<void> {
    await this.submitButton.click()
  }

  async getFormValues(): Promise<TestData> {
    return {
      name: await this.nameInput.inputValue(),
      email: await this.emailInput.inputValue(),
      phone: await this.phoneInput.inputValue(),
      company: await this.companyInput.inputValue(),
      website: await this.websiteInput.inputValue(),
      employees: await this.employeesDropdown.inputValue(),
    }
  }
}
