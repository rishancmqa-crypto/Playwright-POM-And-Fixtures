import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/login.page";
import { InventoryPage } from "../../Pages/inventory.page";
import { CartPage } from "../../Pages/cart.page";
import { CheckoutInfoPage } from "../../Pages/checkoutInfo.page";
import { addToCart } from "../../utils/cartUtils";

test.describe("Checkout Information Module cases", () => {

    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutInfoPage: CheckoutInfoPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutInfoPage = new CheckoutInfoPage(page);

        await loginPage.openLoginpage();
        await loginPage.login('standard_user', 'secret_sauce');
    });


    test("Verify checkout information page loads", async ({ page }) => {


        await addToCart(
            page,
            inventoryPage.addToCartButtonOfbackpack,
            inventoryPage.removeFromCartButtonOfbackpack
        );
        await inventoryPage.clickShoppingCartLink();
        await cartPage.clickCheckout();
        await checkoutInfoPage.verifyPageLoaded();

    })

    test.describe("checkout field validation related cases", () => {


        test.beforeEach(async ({ page }) => {

            await addToCart(
                page,
                inventoryPage.addToCartButtonOfbackpack,
                inventoryPage.removeFromCartButtonOfbackpack
            );

            await inventoryPage.clickShoppingCartLink();
            await cartPage.clickCheckout();


        })

        test("Verify validation when all checkout fields are blank", async ({ page }) => {

            await checkoutInfoPage.fieldValidation("All Empty");
        })

        test("Verify validation when first name is missing", async ({ page }) => {

            await checkoutInfoPage.fieldValidation("First Name Empty");

        })

        test("Verify validation when last name is missing", async ({ page }) => {


            await checkoutInfoPage.fieldValidation("Last Name Empty");

        })

        test("Verify validation when postal code is missing", async ({ page }) => {


            await checkoutInfoPage.fieldValidation("Postal Code Empty");

        })

        test("Verify checkout continues with valid details", async ({ page }) => {


            await checkoutInfoPage.fieldValidation("Valid Details");


        })








    })


})