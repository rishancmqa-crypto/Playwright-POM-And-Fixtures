import { test } from "../../Fixtures/loggedInPage.fixture";


    test("Verify inventory page loads successfully", async ({loggedInPage}) => {

        await loggedInPage.verifyPageLoaded();

    });

    test("Verify all products are displayed on inventory page", async ({loggedInPage}) => {

        await loggedInPage.verifyLocatorCount("CommonLocator", 6)


    });


    test("Verify product card shows name description price and action button", async ({loggedInPage}) => {

        await loggedInPage.verifyLocatorCount("CommonImg", 6);
        await loggedInPage.verifyLocatorVisibility("Sauce Labs Backpack", "null");
        await loggedInPage.verifyLocatorVisibility("Sauce Labs Bolt T-Shirt", "null");
        await loggedInPage.verifyLocatorVisibility("Sauce Labs Onesie", "null");
        await loggedInPage.verifyLocatorVisibility("Sauce Labs Bike Light", "null");
        await loggedInPage.verifyLocatorVisibility("Sauce Labs Fleece Jacket", "null");
        await loggedInPage.verifyLocatorVisibility("Test.allTheThings() T-Shirt (Red)", "null");


        await loggedInPage.verifyLocatorCount("CommonPrice", 6);
        await loggedInPage.verifyLocatorCount("CommonButton", 6);

        await loggedInPage.verifyButtonEnabled();

    });


    test("Verify sorting by Name A to Z", async ({loggedInPage}) => {


        await loggedInPage.verifySorting("A to Z");


    });


    test("Verify sorting by Name Z to A", async ({loggedInPage}) => {

        await loggedInPage.verifySorting("Z to A");



    });


    test("Verify sorting by Price low to high", async ({loggedInPage}) => {

        await loggedInPage.verifySorting("Price low to high")

    });

    test("Verify sorting by Price high to low", async ({loggedInPage}) => {

        await loggedInPage.verifySorting("Price high to low")

    });



    test("Verify add to cart from inventory page", async ({loggedInPage}) => {


        await loggedInPage.buttonClick("onsieAddButton")
        await loggedInPage.verifyLocatorVisibility("null", "onsieRemoveButton")


    });



    test("Verify remove from cart from inventory page", async ({loggedInPage}) => {


        await loggedInPage.buttonClick("onsieAddButton")
        await loggedInPage.buttonClick("onsieRemoveButton")
        await loggedInPage.verifyText("onsieAddButton");

    });

