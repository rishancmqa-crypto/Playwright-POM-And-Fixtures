import { test} from "@playwright/test"
import { LoginPage } from "../../Pages/login.page";
import { InventoryPage } from "../../Pages/inventory.page";


let loginPage: LoginPage;
let inventoryPage: InventoryPage;


test.describe("Inventory Module cases", () => {


    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);

        await loginPage.openLoginpage();
        await loginPage.login('standard_user', 'secret_sauce');

    })


    test("Verify inventory page loads successfully", async () => {

        await inventoryPage.verifyPageLoaded();

    });

    test("Verify all products are displayed on inventory page", async () => {

        await inventoryPage.verifyLocatorCount("CommonLocator", 6)


    });


    test("Verify product card shows name description price and action button", async () => {

        await inventoryPage.verifyLocatorCount("CommonImg", 6);
        await inventoryPage.verifyLocatorVisibility("Sauce Labs Backpack", "null");
        await inventoryPage.verifyLocatorVisibility("Sauce Labs Bolt T-Shirt", "null");
        await inventoryPage.verifyLocatorVisibility("Sauce Labs Onesie", "null");
        await inventoryPage.verifyLocatorVisibility("Sauce Labs Bike Light", "null");
        await inventoryPage.verifyLocatorVisibility("Sauce Labs Fleece Jacket", "null");
        await inventoryPage.verifyLocatorVisibility("Test.allTheThings() T-Shirt (Red)", "null");


        await inventoryPage.verifyLocatorCount("CommonPrice", 6);
        await inventoryPage.verifyLocatorCount("CommonButton", 6);

        await inventoryPage.verifyButtonEnabled();

    });


    test("Verify sorting by Name A to Z", async () => {


        await inventoryPage.verifySorting("A to Z");


    });


    test("Verify sorting by Name Z to A", async () => {

        await inventoryPage.verifySorting("Z to A");



    });


    test("Verify sorting by Price low to high", async () => {

        await inventoryPage.verifySorting("Price low to high")

    });

    test("Verify sorting by Price high to low", async () => {

        await inventoryPage.verifySorting("Price high to low")

    });



    test("Verify add to cart from inventory page", async () => {


        await inventoryPage.buttonClick("onsieAddButton")
        await inventoryPage.verifyLocatorVisibility("null", "onsieRemoveButton")


    });



    test("Verify remove from cart from inventory page", async () => {


        await inventoryPage.buttonClick("onsieAddButton")
        await inventoryPage.buttonClick("onsieRemoveButton")
        await inventoryPage.verifyText("onsieAddButton");

    });


});