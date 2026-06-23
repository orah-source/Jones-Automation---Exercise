import { test, expect } from '@playwright/test'
import * as path from 'path'
import * as fs from 'fs'
import { baseUrl, testData } from '../config/config'
import { FormPage } from '../pages/FormPage'
import { ThankYouPage } from '../pages/ThankYouPage'

const SCREENSHOT_PATH = path.join(__dirname, '..', 'screenshots', 'before-submit.png')

test.describe('Contact form', () => {

  test('full flow - fill form, screenshot, submit and reach thank you page', async ({ page }) => {
    const formPage = new FormPage(page)
    await formPage.navigate(baseUrl)
    await formPage.fillForm(testData)
    await formPage.takeScreenshot(SCREENSHOT_PATH)
    await formPage.submit()

    const thankYouPage = new ThankYouPage(page)
    await thankYouPage.waitForPage()

    const message = await thankYouPage.getSubHeadingText()
    console.log(`Success! Thank You page reached. Message: "${message.trim()}"`)
  })

  test('form fields are filled with correct values', async ({ page }) => {
    const formPage = new FormPage(page)
    await formPage.navigate(baseUrl)
    await formPage.fillForm(testData)

    const values = await formPage.getFormValues()
    expect.soft(values.name).toBe(testData.name)
    expect.soft(values.email).toBe(testData.email)
    expect.soft(values.phone).toBe(testData.phone)
    expect.soft(values.company).toBe(testData.company)
    expect.soft(values.website).toBe(testData.website)
    expect.soft(values.employees).toBe(testData.employees)
  })

  test('screenshot is saved before submit', async ({ page }) => {
    const formPage = new FormPage(page)
    await formPage.navigate(baseUrl)
    await formPage.fillForm(testData)
    await formPage.takeScreenshot(SCREENSHOT_PATH)

    expect(fs.existsSync(SCREENSHOT_PATH)).toBe(true)
  })

  test('submitting the form redirects to thank you page', async ({ page }) => {
    const formPage = new FormPage(page)
    await formPage.navigate(baseUrl)
    await formPage.fillForm(testData)
    await formPage.submit()

    await expect(page).toHaveURL(/thank-you\.html/)
  })

  test('thank you page shows correct heading and message', async ({ page }) => {
    const formPage = new FormPage(page)
    await formPage.navigate(baseUrl)
    await formPage.fillForm(testData)
    await formPage.submit()

    const thankYouPage = new ThankYouPage(page)
    await thankYouPage.waitForPage()

    const isHeadingVisible = await thankYouPage.isHeadingVisible()
    const message = await thankYouPage.getSubHeadingText()

    expect.soft(isHeadingVisible).toBe(true)
    expect.soft(message.trim()).toBeTruthy()
    console.log(`Success! Thank You page reached. Message: "${message.trim()}"`)
  })

})
