import { defineConfig } from '@playwright/test'
import { baseUrl } from './config/config'

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: baseUrl,
    headless: false,
  },
})
