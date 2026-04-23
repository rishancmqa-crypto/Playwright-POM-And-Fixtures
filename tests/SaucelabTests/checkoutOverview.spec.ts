import {test, expect} from "@playwright/test";
import {LoginPage} from "../../Pages/login.page";
import {InventoryPage} from "../../Pages/inventory.page";
import {CartPage} from "../../Pages/cart.page";
import {CheckoutInfoPage} from "../../Pages/checkoutInfo.page";
import {addToCart} from "../../utils/cartUtils";
import { CheckoutOverviewPage } from "../../Pages/checkoutOverview.pages";
import { CheckoutCompletePage } from "../../Pages/checkoutComplete.page";

test.describe("Checkout Overview Module cases", () => {


        let ItemNames: string[];
        let ItemDescription: string[];
        let itemPrices: string[];

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

            await checkoutOverviewPage.getCartItemsDetails();

            await cartPage.clickCheckout();
            await checkoutInfoPage.fillCheckoutInfo();

        })


        test("Verify checkout overview page displays order summary", async () => {


            await checkoutOverviewPage.verifyOrderSummary("Verify Item Details");


        })

        test("Verify item details remain correct in checkout overview", async () => {



            await checkoutOverviewPage.verifyOrderSummary("Verify items are same as of cart");
            


        })


        test("Verify cancel from checkout overview", async () => {

            await checkoutOverviewPage.clickCancelButton();
            await inventoryPage.verifyPageLoaded();


        })

        test("Verify finish order from checkout overview", async () => {

            await checkoutOverviewPage.clickFinishButton();
            await checkoutCompletePage.verifyPageLoaded();


        })






    })