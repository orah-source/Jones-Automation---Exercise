"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThankYouPage = void 0;
class ThankYouPage {
    constructor(page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Thank You!', level: 1 });
        this.subHeading = page.locator('h2.text-center');
    }
    async waitForPage() {
        await this.heading.waitFor({ state: 'visible' });
    }
    async getSubHeadingText() {
        return (await this.subHeading.textContent()) ?? ''; //"??" = if the text is null, return an empty string
    }
    async isHeadingVisible() {
        return await this.heading.isVisible();
    }
}
exports.ThankYouPage = ThankYouPage;
