import { test, expect } from "@playwright/test"
import { LoginPage } from "../../Pages/login.page";
import { InventoryPage } from "../../Pages/inventory.page";
import { ProductDetailsPage } from "../../Pages/productDetails.page";


let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let productDetailsPage: ProductDetailsPage;



test.describe("Product Details module cases", () => {


    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        productDetailsPage = new ProductDetailsPage(page);

        await loginPage.openLoginpage();
        await loginPage.login('standard_user', 'secret_sauce');

    })



    test("Verify product detail page opens from product name", async () => {

        await inventoryPage.clickByLocator("backpackTitle");
        await productDetailsPage.verifyVisibilityByLocator("backToProductsButton")

    })


    test("Verify product detail page opens from product image", async () => {

        await inventoryPage.clickByLocator("backpackImgLocator");
        await productDetailsPage.verifyVisibilityByLocator("backToProductsButton")
    })


    test("Verify product detail page content", async () => {

        await inventoryPage.clickByLocator("backpackTitle");

        await productDetailsPage.verifyVisibilityByLocator("itemName")
        await productDetailsPage.verifyVisibilityByLocator("itemImage")
        await productDetailsPage.verifyVisibilityByLocator("itemPrice")
        await productDetailsPage.verifyVisibilityByLocator("addToCart")

    });




    test("Verify add to cart from product detail page", async () => {

        await productDetailsPage.verifyCartCount();


    });


    test("Verify back to products navigation from product detail page", async () => {

        await inventoryPage.clickByLocator("backpackImgLocator");
        await productDetailsPage.clickByLocator("backToProductsButton");
        await productDetailsPage.verifyURL();

    });



});