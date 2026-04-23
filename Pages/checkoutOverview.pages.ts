import type { Page, Locator } from "@playwright/test";
import { CartPage } from "./cart.page";
import { expect } from "@playwright/test";

export class CheckoutOverviewPage {

    page: Page;
    itemNames: string[];
    itemDescription: string[];
    itemPrices: string[];
    cartPage: CartPage;
    itemNameLocator: Locator;
    itemDescriptionLocator: Locator;
    itemPricesLocator: Locator;
    totalLabelLocator: Locator;
    cancelLocator: Locator;
    finishLocator: Locator;


    constructor(page: Page) {

        this.page = page;
        this.itemNames = [];
        this.itemDescription = [];
        this.itemPrices = [];
        this.cartPage = new CartPage(this.page);
        this.itemNameLocator = page.locator('.inventory_item_name')
        this.itemDescriptionLocator = page.locator('.inventory_item_desc')
        this.itemPricesLocator = page.locator('.inventory_item_price')
        this.totalLabelLocator = page.locator('[data-test="total-label"]')
        this.cancelLocator = page.locator('[data-test="cancel"]')
        this.finishLocator = page.locator('[data-test="finish"]')
        



    }

    async getCartItemsDetails() {


        const { itemNames, itemDescriptions, itemPrices } = await this.cartPage.takeCartitemDetails();
        this.itemNames = itemNames;
        this.itemDescription = itemDescriptions;
        this.itemPrices = itemPrices;


    }

    async verifyOrderSummary(type?: string) {

        if (type === "Verify Item Details") {
            let cartCount = Number(this.itemNames.length);

        await expect(this.itemNameLocator).toHaveCount(cartCount);
        await expect(this.itemDescriptionLocator).toHaveCount(cartCount);
        await expect(this.itemPricesLocator).toHaveCount(cartCount);

        await expect(this.totalLabelLocator).toBeVisible();
        
    }else if(type === "Verify items are same as of cart"){

            let actualItemNames = await this.itemNameLocator.allInnerTexts();
            let actualItemDescription = await this.itemDescriptionLocator.allInnerTexts();
            let actualItemPrice = await this.itemPricesLocator.allInnerTexts();


            expect(actualItemNames).toEqual(this.itemNames);
            expect(actualItemDescription).toEqual(this.itemDescription);
            expect(actualItemPrice).toEqual(this.itemPrices);

    } 
        
    }

    async clickCancelButton() {

        await this.cancelLocator.click();
    
    }

    async clickFinishButton() {
        await this.finishLocator.click();
    }






}
