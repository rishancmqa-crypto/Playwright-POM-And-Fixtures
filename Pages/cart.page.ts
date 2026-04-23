import type { Page, Locator } from "@playwright/test"
import { expect } from "@playwright/test";

export class CartPage {

    page: Page;
    cartItemTitleLocator: Locator;
    cartItemDescriptionLocator: Locator;
    cartItemPriceLocator: Locator;
    cart2ndItemTitleLocator: Locator;
    cart2ndItemDescriptionLocator: Locator;
    cart2ndItemPriceLocator: Locator;
    cartItemCommonLocator: Locator;
    removeItemLocator: Locator;
    continueShoppingLocator: Locator;
    checkoutLocator: Locator;

    constructor(page: Page) {
        this.page = page
        this.cartItemTitleLocator = page.locator('[data-test="item-0-title-link"]')
        this.cartItemDescriptionLocator = page.getByText('A red light isn\'t the desired')
        this.cartItemPriceLocator = page.getByText('$9.99')

        this.cart2ndItemTitleLocator = page.locator('[data-test="item-4-title-link"]')
        this.cart2ndItemDescriptionLocator = page.getByText('carry.allTheThings() with the')
        this.cart2ndItemPriceLocator = page.getByText('$29.99')

        this.cartItemCommonLocator = page.locator('.cart_item')
        this.removeItemLocator = page.locator('[data-test="remove-sauce-labs-backpack"]')
        this.continueShoppingLocator = page.locator('[data-test="continue-shopping"]')
        this.checkoutLocator = page.locator('[data-test="checkout"]')

    }

    async verifyPageLoaded() {

        await expect(this.page).toHaveURL("https://www.saucedemo.com/cart.html")
    }

    async verifyCartItemDetails(type: number) {

        if (type === 1) {

            await expect(this.cartItemTitleLocator).toBeVisible();
            await expect(this.cartItemDescriptionLocator).toBeVisible();
            await expect(this.cartItemPriceLocator).toBeVisible();

        } else if (type === 2) {
            await expect(this.cart2ndItemTitleLocator).toBeVisible();
            await expect(this.cart2ndItemDescriptionLocator).toBeVisible();
            await expect(this.cart2ndItemPriceLocator).toBeVisible();
        }


    }

    async verifyRemoveitemsFromCart() {

          let beforeCount = await this.cartItemCommonLocator.count();

            await this.removeItemLocator.click();

            if (beforeCount > 0) {
                await expect(this.cartItemCommonLocator).toHaveCount(beforeCount - 1);
            }
            else {
                await expect(this.cartItemCommonLocator).toHaveCount(0);
            }
    }

    async clickContinueShopping() {

        await this.continueShoppingLocator.click();
    }

    async clickCheckout() {

        await this.checkoutLocator.click();
    }

    async takeCartitemDetails() {

        

        const itemNames = await this.cart2ndItemTitleLocator.allInnerTexts();
        const itemDescriptions = await this.cart2ndItemDescriptionLocator.allInnerTexts();
        const itemPrices = await this.cart2ndItemPriceLocator.allInnerTexts();

        return { itemNames, itemDescriptions, itemPrices };
    }

}
