import type { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export class CheckoutInfoPage {

    page: Page;
    continueButton: Locator;
    firstNameError: Locator;
    firstNameField: Locator;
    lastNameError: Locator;
    lastNameField: Locator
    postalCodeError: Locator;
    postalCodeField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.continueButton = this.page.locator('[data-test="continue"]');
        this.firstNameError = this.page.locator('div').filter({ hasText: /^Error: First Name is required$/ }).nth(1);
        this.firstNameField = this.page.locator('[data-test="firstName"]');
        this.lastNameError = this.page.locator('div').filter({ hasText: /^Error: Last Name is required$/ }).nth(1);
        this.lastNameField = this.page.locator('[data-test="lastName"]');
        this.postalCodeError = this.page.locator('div').filter({ hasText: /^Error: Postal Code is required$/ }).nth(1);
        this.postalCodeField = this.page.locator('[data-test="postalCode"]');
    }

    async verifyPageLoaded() {
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")
    }

    async fieldValidation(type: string) {

        if (type === "All Empty"|| type === "First Name Empty") {
            await this.continueButton.click();
            await expect(this.firstNameError).toBeVisible();
           
        } else if (type === "Last Name Empty") {

            await this.firstNameField.fill('TestFirst');
            await this.continueButton.click();
            await expect(this.lastNameError).toBeVisible();


        } else if (type === "Postal Code Empty") {

            await this.firstNameField.fill('TestFirst');
            await this.lastNameField.fill('testLast');
            await this.continueButton.click();
            await expect(this.postalCodeError).toBeVisible();
        } else if (type === "Valid Details") {

            await this.firstNameField.fill('TestFirst');
            await this.lastNameField.fill('testLast');
            await this.postalCodeField.fill('1234');
            await this.continueButton.click();
            await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html")
        }

        

    }

    async fillCheckoutInfo() {
        await this.firstNameField.fill('TestFirst');
        await this.lastNameField.fill('testLast');
        await this.postalCodeField.fill('1234');
        await this.continueButton.click();
    }


}

