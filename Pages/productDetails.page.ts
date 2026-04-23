import type {Page , Locator } from "@playwright/test"
import { expect } from "@playwright/test";



type LocatorType =
| "backpackTitle"
| "backToProductsButton"
| "itemName"
| "itemImage"
| "itemPrice"
| "addToCart"



export class ProductDetailsPage{

    page: Page
    backpackTitleLocator: Locator;
    backToProductsButtonLocator: Locator;
    itemNameLocator: Locator;
    itemImageLocator: Locator;
    itemPriceLocator: Locator;
    addToCartLocator: Locator;
    cartBadgeLocator : Locator;
    removeFromCartLocator: Locator;

    constructor(page: Page){
        this.page = page
        this.backpackTitleLocator = page.locator('[data-test="item-4-title-link"]')
        this.backToProductsButtonLocator = page.locator('[data-test="back-to-products"]');
        this.itemNameLocator = page.locator('[data-test="inventory-item-name"]');
        this.itemImageLocator = page.locator('[data-test="item-sauce-labs-backpack-img"]');
        this.itemPriceLocator = page.locator('[data-test="inventory-item-price"]');
        this.addToCartLocator = page.locator('[data-test="add-to-cart"]')
        this.cartBadgeLocator = page.locator('[data-test="shopping-cart-badge"]')
        this.removeFromCartLocator = page.locator('[data-test="remove"]')
        

    }
    getLocator(LocatorType: LocatorType): Locator{
        const map = {
            backpackTitle: this.backpackTitleLocator,
            backToProductsButton: this.backToProductsButtonLocator,
            itemName: this.itemNameLocator,
            itemImage: this.itemImageLocator,
            itemPrice: this.itemPriceLocator,
            addToCart: this.addToCartLocator
        }
        const locator = map[LocatorType]
        
        if(!locator){
            throw new Error(`Invalid locatorType: ${LocatorType}`);
        }
        return locator;


    }

    async clickByLocator(LocatorType: LocatorType){

        await this.getLocator(LocatorType).click();

    }

    async verifyVisibilityByLocator(LocatorType: LocatorType){

        await expect(this.getLocator(LocatorType)).toBeVisible();
    }

    async verifyCartCount(){

         await this.backpackTitleLocator.click();
        
                const cartBadge = this.cartBadgeLocator;
        
                let before = 0;
        
                if (await cartBadge.isVisible()) {
                    before = Number(await cartBadge.innerText());
                }
        
                await this.addToCartLocator.click();
                await expect(this.removeFromCartLocator).toBeVisible();
        
                const after = Number(await cartBadge.innerText());
        
                expect(after).toBe(before + 1);
    }
    async verifyURL(){

        await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html")

    }






}