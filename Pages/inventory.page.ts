import { expect } from "@playwright/test"
import type { Page, Locator } from "@playwright/test"


 type LocatorType =
    | 'CommonLocator'
    | 'CommonImg'
    | 'CommonPrice'
    | 'onsieAddButton'
    | 'CommonButton'
    | 'onsieRemoveButton'
    | 'backpackTitle'
    | 'backpackImgLocator'
    | 'null'
   


export class InventoryPage {

    page: Page;
    inventoryCommonLocator: Locator;
    itemsCommonLocatorImg: Locator;
    itemsCommonLocatorName: Locator;
    itemsCommonLocatorPrice: Locator;
    itemsCommonLocatorButton: Locator;
    sortDropdown: Locator;
    addToCartButtonOfonsie: Locator;
    removeFromCartButtonOfonsie: Locator;
    backpackTitleLocator: Locator;
    backpackImgLocator: Locator;
    shoppingCartLinkLocator: Locator;
    addToCartButtonOfbackpack: Locator;
    removeFromCartButtonOfbackpack: Locator;
    addToCartButtonOfbikeLight: Locator;
    removeFromCartButtonOfbikeLight: Locator;
    shopping_cart_badge: Locator;



    constructor(page: Page) {

        this.page = page
        this.shopping_cart_badge = page.locator('.shopping_cart_badge')
        this.inventoryCommonLocator = page.locator('[data-test="inventory-item"]')
        this.itemsCommonLocatorImg = page.locator('.inventory_item_img img');
        this.itemsCommonLocatorName = page.locator('[data-test="inventory-item-name"]')
        this.itemsCommonLocatorPrice = page.locator('[data-test="inventory-item-price"]')
        this.itemsCommonLocatorButton = page.locator('[data-test^="add-to-cart"]')
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.addToCartButtonOfonsie = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]')
        this.removeFromCartButtonOfonsie = page.locator('[data-test="remove-sauce-labs-onesie"]')
        this.backpackTitleLocator = page.locator('[data-test="item-4-title-link"]')
        this.backpackImgLocator = page.locator('[data-test="item-4-img-link"]')
        this.shoppingCartLinkLocator = page.locator('[data-test="shopping-cart-link"]')
        this.addToCartButtonOfbackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        this.removeFromCartButtonOfbackpack = page.locator('[data-test="remove-sauce-labs-backpack"]')
        this.addToCartButtonOfbikeLight = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
        this.removeFromCartButtonOfbikeLight = page.locator('[data-test="remove-sauce-labs-bike-light"]')






    }

    async verifyPageLoaded() {

        await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html")

    }

   

    getLocator(locatorType: LocatorType): Locator {
        const map = {
            CommonLocator: this.inventoryCommonLocator,
            CommonImg: this.itemsCommonLocatorImg,
            CommonPrice: this.itemsCommonLocatorPrice,
            CommonButton: this.itemsCommonLocatorButton,
            onsieAddButton: this.addToCartButtonOfonsie,
            onsieRemoveButton: this.removeFromCartButtonOfonsie,
            backpackTitle: this.backpackTitleLocator,
            backpackImgLocator: this.backpackImgLocator,
            null: undefined
        };

        const locator = map[locatorType];

        if (!locator) {
            throw new Error(`Invalid locatorType: ${locatorType}`);
        }

        return locator;
    }



    async verifyLocatorCount(locatorType: LocatorType, count: number) {


        // switch (locatorType) {
        //     case 'CommonLocator':
        //         locator = this.inventoryCommonLocator
        //         break
        //     case 'CommonImg':
        //         locator = this.itemsCommonLocatorImg
        //         break;
        //     case 'CommonPrice':
        //         locator = this.itemsCommonLocatorPrice
        //         break;
        //     case 'CommonButton':
        //         locator = this.itemsCommonLocatorButton;
        //         break;
        //     default:
        //         throw new Error(`Invalid locatorType: ${locatorType}`);
        // }


        await expect(this.getLocator(locatorType)).toHaveCount(count);

    }

    async verifyLocatorVisibility(itemName: string, LocatorType: LocatorType) {

        if(LocatorType==="null"){
            await expect(this.itemsCommonLocatorName.filter({ hasText: itemName })).toBeVisible();
        }else{
            await expect(this.getLocator(LocatorType)).toBeVisible();
        }

        
    }

    async verifyButtonEnabled() {

        for (let i = 0; i < 6; i++) {

            await expect(this.itemsCommonLocatorButton.nth(i)).toBeEnabled();

        };

    }

    async verifySorting(type: string) {


        if (type === "A to Z") {

            // Step 1: Select sorting
            await this.sortDropdown.selectOption({ label: 'Name (A to Z)' });

            // Step 2: Get all product names from UI
            const actualNames = await this.itemsCommonLocatorName.allTextContents();

            // Step 3: Create expected sorted list
            const expectedNames = [...actualNames].sort();

            // Step 4: Compare
            expect(actualNames).toEqual(expectedNames);

        } else if (type === "Z to A") {


            // Step 1: Select sorting
            await this.sortDropdown.selectOption({ label: 'Name (Z to A)' });

            // Step 2: Get all product names from UI
            const actualNames = await this.itemsCommonLocatorName.allTextContents();

            // Step 3: Create expected sorted list
            const expectedNames = [...actualNames].sort().reverse();

            // Step 4: Compare
            expect(actualNames).toEqual(expectedNames);


        } else if (type === "Price low to high") {



            // Step 1: Select sorting
            await this.sortDropdown.selectOption({ label: 'Price (low to high)' });

            // Step 2: Get prices from UI
            const actualPrices = await this.itemsCommonLocatorPrice.allTextContents();

            // Step 3: Convert to numbers
            const actualNumbers = actualPrices.map(price =>
                parseFloat(price.replace('$', ''))
            );

            // Step 4: Create expected sorted list
            const expectedNumbers = [...actualNumbers].sort((a, b) => a - b);

            // Step 5: Compare
            expect(actualNumbers).toEqual(expectedNumbers);


        } else {



            // Step 1: Select sorting
            await this.sortDropdown.selectOption({ label: 'Price (high to low)' });

            // Step 2: Get prices from UI
            const actualPrices = await this.itemsCommonLocatorPrice.allTextContents();

            // Step 3: Convert to numbers
            const actualNumbers = actualPrices.map(price =>
                parseFloat(price.replace('$', ''))
            );

            // Step 4: Expected (descending)
            const expectedNumbers = [...actualNumbers].sort((a, b) => b - a);

            // Step 5: Compare
            expect(actualNumbers).toEqual(expectedNumbers);


        }




    }

    async buttonClick(locatorType: LocatorType) {

        await this.getLocator(locatorType).click()
        

    }

    async verifyText(LocatorType: LocatorType){

        await expect(this.getLocator(LocatorType)).toHaveText("Add to cart");

    }

     async clickByLocator(LocatorType: LocatorType){

        await this.getLocator(LocatorType).click();

    }

    async clickShoppingCartLink(){

        await this.shoppingCartLinkLocator.click();
    }

    async VerifyCartBadgePresence() {
        await expect(this.shopping_cart_badge).toHaveCount(0);
    }

}