"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const path = __importStar(require("path"));
const config_1 = require("./config/config");
const FormPage_1 = require("./pages/FormPage");
const ThankYouPage_1 = require("./pages/ThankYouPage");
const SCREENSHOT_PATH = path.join(__dirname, 'screenshots', 'before-submit.png');
(async () => {
    const browser = await test_1.chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
        console.log('Navigating to form page...');
        const formPage = new FormPage_1.FormPage(page);
        await formPage.navigate(config_1.baseUrl);
        console.log('Form page loaded.');
        console.log('Filling out form fields...');
        await formPage.fillForm(config_1.testData);
        console.log('Form fields filled (including employees dropdown set to 51-500).');
        console.log('Taking screenshot before submit...');
        await formPage.takeScreenshot(SCREENSHOT_PATH);
        console.log(`Screenshot saved → ${SCREENSHOT_PATH}`);
        console.log('Clicking "Request a call back"...');
        await formPage.submit();
        console.log('Waiting for Thank You page...');
        const thankYouPage = new ThankYouPage_1.ThankYouPage(page);
        await thankYouPage.waitForPage();
        const message = await thankYouPage.getSubHeadingText();
        console.log(`Success! Thank You page reached. Message: "${message.trim()}"`);
    }
    catch (error) {
        console.error('Error:', error instanceof Error ? error.message : error);
        process.exitCode = 1;
    }
    finally {
        await browser.close();
    }
})();
