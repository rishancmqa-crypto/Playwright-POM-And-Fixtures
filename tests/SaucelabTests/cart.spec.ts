import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/login.page";
import { InventoryPage } from "../../Pages/inventory.page";
import { CartPage } from "../../Pages/cart.page";
import { addToCart } from "../../utils/cartUtils";
import { CheckoutInfoPage } from "../../Pages/checkoutInfo.page";




test.describe("Cart module cases", () => {


    let loginPage: LoginPage;
    let cartPage: CartPage;
    let inventoryPage: InventoryPage;
    let checkoutInfoPage: CheckoutInfoPage;


    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);

        await loginPage.openLoginpage();
        await loginPage.login('standard_user', 'secret_sauce');

    });



        test("Verify cart page opens from cart icon", async () => {

            await inventoryPage.clickShoppingCartLink();
            await cartPage.verifyPageLoaded();


        })

        test("Verify added item is displayed in cart", async ({ page }) => {


            await addToCart(
                page,
                inventoryPage.addToCartButtonOfbackpack,
                inventoryPage.removeFromCartButtonOfbackpack
            )

            await inventoryPage.clickShoppingCartLink();
            await cartPage.verifyCartItemDetails(2);


        })


        test("Verify multiple items are displayed in cart", async ({ page }) => {

            await addToCart(
                page,
                inventoryPage.addToCartButtonOfbackpack,
                inventoryPage.removeFromCartButtonOfbackpack
            )

            await addToCart(
                page,
                inventoryPage.addToCartButtonOfbikeLight,
                inventoryPage.removeFromCartButtonOfbikeLight
            )

            await inventoryPage.clickShoppingCartLink();
            await cartPage.verifyCartItemDetails(1);

            await cartPage.verifyCartItemDetails(2);

        })

        test("Verify remove item from cart page", async ({ page }) => {


           await addToCart(
                page,
                inventoryPage.addToCartButtonOfbackpack,
                inventoryPage.removeFromCartButtonOfbackpack
            );

            await inventoryPage.clickShoppingCartLink();
            await cartPage.verifyRemoveitemsFromCart();



        })

        test("Verify Continue Shopping button from cart", async () => {

            await inventoryPage.clickShoppingCartLink();
            await cartPage.clickContinueShopping();
            await inventoryPage.verifyPageLoaded();


        })

        test("Verify Checkout button from cart", async ({ page }) => {

            checkoutInfoPage = new CheckoutInfoPage(page);

            await addToCart(
                page,
                inventoryPage.addToCartButtonOfbackpack,
                inventoryPage.removeFromCartButtonOfbackpack
            );


            await inventoryPage.clickShoppingCartLink();
            await cartPage.clickCheckout();
            await checkoutInfoPage.verifyPageLoaded();


        })


    })