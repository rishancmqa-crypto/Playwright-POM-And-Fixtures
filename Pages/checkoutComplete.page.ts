import type { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";
export class CheckoutCompletePage {

    page: Page;
    headerLocator: Locator;
    completeTextLocator: Locator
    backToProductsButtonLocator: Locator;



    constructor(page: Page) {

        this.page = page;
        this.headerLocator = page.locator('[data-test="complete-header"]');
        this.completeTextLocator = page.locator('[data-test="complete-text"]');
        this.backToProductsButtonLocator = page.locator('[data-test="back-to-products"]');
        


    }

    async verifyPageLoaded() {
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-complete.html")
    }

    async verifyPageContent() {
        await expect(this.headerLocator).toBeVisible();
        await expect(this.completeTextLocator).toBeVisible();
        await expect(this.backToProductsButtonLocator).toBeVisible();
    }

    async clickBackToProductsButton() {
        await this.backToProductsButtonLocator.click();
    }


}