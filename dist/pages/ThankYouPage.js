"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThankYouPage = void 0;
class ThankYouPage {
    constructor(page) {
        this.page = page;
        this.heading = page.locator('xpath=//h1[normalize-space()="Thank You!"]');
        this.subHeading = page.locator('xpath=//h2[contains(@class,"text-center")]');
    }
    async waitForPage() {
        await this.heading.waitFor({ state: 'visible' });
    }
    async getSubHeadingText() {
        return (await this.subHeading.textContent()) ?? '';
    }
    async isHeadingVisible() {
        return await this.heading.isVisible();
    }
}
exports.ThankYouPage = ThankYouPage;
