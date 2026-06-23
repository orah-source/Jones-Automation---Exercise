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
exports.FormPage = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
class FormPage {
    constructor(page) {
        this.page = page;
        this.nameInput = page.locator('xpath=//input[@id="name"]');
        this.emailInput = page.locator('xpath=//input[@id="email"]');
        this.phoneInput = page.locator('xpath=//input[@id="phone"]');
        this.companyInput = page.locator('xpath=//input[@id="company"]');
        this.websiteInput = page.locator('xpath=//input[@id="website"]');
        this.employeesDropdown = page.locator('xpath=//select[@id="employees"]');
        this.submitButton = page.locator('xpath=//button[normalize-space()="Request a call back"]');
    }
    async navigate(url) {
        await this.page.goto(url);
        await this.nameInput.waitFor({ state: 'visible' });
    }
    async fillForm(data) {
        await this.nameInput.fill(data.name);
        await this.emailInput.fill(data.email);
        await this.phoneInput.fill(data.phone);
        await this.companyInput.fill(data.company);
        await this.websiteInput.fill(data.website);
        await this.employeesDropdown.selectOption({ label: data.employees });
    }
    async takeScreenshot(screenshotPath) {
        const dir = path.dirname(screenshotPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        await this.page.screenshot({ path: screenshotPath });
    }
    async submit() {
        await this.submitButton.click();
    }
    async getFormValues() {
        return {
            name: await this.nameInput.inputValue(),
            email: await this.emailInput.inputValue(),
            phone: await this.phoneInput.inputValue(),
            company: await this.companyInput.inputValue(),
            website: await this.websiteInput.inputValue(),
            employees: await this.employeesDropdown.inputValue(),
        };
    }
}
exports.FormPage = FormPage;
