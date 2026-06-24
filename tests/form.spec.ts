import { test, expect } from '@playwright/test'
import * as path from 'path'
import * as fs from 'fs'
import { baseUrl, testData } from '../config/config'
import { FormPage } from '../pages/FormPage'
import { ThankYouPage } from '../pages/ThankYouPage'

const SCREENSHOT_PATH = path.join(__dirname, '..', 'screenshots', 'before-submit.png')

test('full flow - fill form, screenshot, submit and reach thank you page', async ({ page }) => {
  
  const formPage = new FormPage(page)
  await formPage.navigate(baseUrl)
  await formPage.fillForm(testData)

  const formValues = await formPage.getFormValues()

  await formPage.takeScreenshot(SCREENSHOT_PATH)
  await formPage.submit()

  const thankYouPage = new ThankYouPage(page)
  await thankYouPage.waitForPage()

  const isHeadingVisible = await thankYouPage.isHeadingVisible()
  const message = await thankYouPage.getSubHeadingText()

  
  expect.soft(formValues.name).toBe(testData.name)
  expect.soft(formValues.email).toBe(testData.email)
  expect.soft(formValues.phone).toBe(testData.phone)
  expect.soft(formValues.company).toBe(testData.company)
  expect.soft(formValues.website).toBe(testData.website)
  expect.soft(formValues.employees).toBe(testData.employees)

  expect(fs.existsSync(SCREENSHOT_PATH)).toBe(true)

  await expect(page).toHaveURL(/thank-you\.html/)
  expect.soft(isHeadingVisible).toBe(true)
  expect.soft(message.trim()).toBeTruthy()
})
