import { chromium } from '@playwright/test'
import * as path from 'path'
import { baseUrl, testData } from './config/config'
import { FormPage } from './pages/FormPage'
import { ThankYouPage } from './pages/ThankYouPage'

const SCREENSHOT_PATH = path.join(__dirname, 'screenshots', 'before-submit.png')

;(async (): Promise<void> => {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page = await context.newPage()

  try {
    console.log('Navigating to form page...')
    const formPage = new FormPage(page)
    await formPage.navigate(baseUrl)
    console.log('Form page loaded.')

    console.log('Filling out form fields...')
    await formPage.fillForm(testData)
    console.log('Form fields filled (including employees dropdown set to 51-500).')

    console.log('Taking screenshot before submit...')
    await formPage.takeScreenshot(SCREENSHOT_PATH)
    console.log(`Screenshot saved → ${SCREENSHOT_PATH}`)

    console.log('Clicking "Request a call back"...')
    await formPage.submit()

    console.log('Waiting for Thank You page...')
    const thankYouPage = new ThankYouPage(page)
    await thankYouPage.waitForPage()

    const message = await thankYouPage.getSubHeadingText()
    console.log(`Success! Thank You page reached. Message: "${message.trim()}"`)
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error)
    process.exitCode = 1
  } finally {
    await browser.close()
  }
})()
