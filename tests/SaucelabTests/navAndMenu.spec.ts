import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/login.page";
import { InventoryPage } from "../../Pages/inventory.page";
import { NavAndMenuPage } from "../../Pages/navAndMenu.page";
import { addToCart } from "../../utils/cartUtils";


test.describe("Navigation and Menu Module cases", () => {

    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let navAndMenuPage: NavAndMenuPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        navAndMenuPage = new NavAndMenuPage(page);


        await loginPage.openLoginpage();
        await loginPage.login('standard_user', 'secret_sauce');

        await navAndMenuPage.clickOpenMenuButton();
    });

    test("Verify burger menu opens successfully", async () => {
        await navAndMenuPage.verifyMenuOpened();
    });


    test("Verify All Items navigation from menu", async () => {
        await inventoryPage.clickShoppingCartLink();
        await navAndMenuPage.clickOpenMenuButton();
        await navAndMenuPage.clickAllItemsOption();
        await inventoryPage.verifyPageLoaded();

    });

    test("Verify About link navigation", async () => {

        await navAndMenuPage.clickAboutOption();
        await navAndMenuPage.verfyAboutPageLoaded();
    });

    test("Verify Logout functionality", async () => {

        await navAndMenuPage.clickLogoutOption();
        await navAndMenuPage.verifyLogout();

    });

    test("Verify Reset App State clears cart items", async ({ page }) => {

        await addToCart(
            page,
            inventoryPage.addToCartButtonOfbackpack,
            inventoryPage.removeFromCartButtonOfbackpack
        );



        await navAndMenuPage.clickResetOption();
        await inventoryPage.VerifyCartBadgePresence();

    });


    test("Verify user cannot access inventory after logout using direct URL", async () => {

        await navAndMenuPage.clickLogoutOption();
        await loginPage.tryInventoryURLWithoutLogin();

    });

});