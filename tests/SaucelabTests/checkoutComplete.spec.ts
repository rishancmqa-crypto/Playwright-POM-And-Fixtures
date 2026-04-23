import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/login.page";
import { InventoryPage } from "../../Pages/inventory.page";
import { addToCart } from "../../utils/cartUtils";
import { CartPage } from "../../Pages/cart.page";
import { CheckoutInfoPage } from "../../Pages/checkoutInfo.page";
import { CheckoutOverviewPage } from "../../Pages/checkoutOverview.pages";
import { CheckoutCompletePage } from "../../Pages/checkoutComplete.page";

test.describe("Checkout Complete Module cases", () => {

    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutInfoPage: CheckoutInfoPage;
    let checkoutOverviewPage: CheckoutOverviewPage;
    let checkoutCompletePage: CheckoutCompletePage;


    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutInfoPage = new CheckoutInfoPage(page);
        checkoutOverviewPage = new CheckoutOverviewPage(page);
        checkoutCompletePage = new CheckoutCompletePage(page);



        await loginPage.openLoginpage();
        await loginPage.login('standard_user', 'secret_sauce');


        await addToCart(
            page,
            inventoryPage.addToCartButtonOfbackpack,
            inventoryPage.removeFromCartButtonOfbackpack
        );

        await inventoryPage.clickShoppingCartLink();
        await cartPage.clickCheckout();
        await checkoutInfoPage.fillCheckoutInfo();
        await checkoutOverviewPage.clickFinishButton();


    })

    test("Verify checkout complete page content", async () => {

        await checkoutCompletePage.verifyPageContent();
    })

    test("Verify Back Home from complete page", async () => {

        await checkoutCompletePage.clickBackToProductsButton();
        await inventoryPage.verifyPageLoaded();

    })



})