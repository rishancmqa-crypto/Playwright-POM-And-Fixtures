import { test, expect } from "@playwright/test"
import { LoginPage } from "../../Pages/login.page"

test.describe("Login Module cases", () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page)
        await loginPage.openLoginpage();

    });

    test("Verify login page loads successfully", async () => {

        await expect(loginPage.loginButton).toBeVisible()

    });

    test("Verify login with valid standard user", async () => {

        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.titleCheck();


    });

    test("Verify login with locked out user", async () => {

        await loginPage.login('locked_out_user', 'secret_sauce');
        await loginPage.bannerCheck(loginPage.lockedoutBanner)

    });


    test("Verify login with invalid username", async () => {

        await loginPage.login('invalid_user', 'secret_sauce')
        await loginPage.bannerCheck(loginPage.invaliduserBanner);

    });

    test("Verify login with invalid password", async () => {

        await loginPage.login('standard_user', 'wrong_password');
        await loginPage.bannerCheck(loginPage.invaliduserBanner);

    });


    test("Verify error when username and password are blank", async () => {

        await loginPage.login('', '')
        await loginPage.bannerCheck(loginPage.emptyUsernameBanner);

    });


    test("Verify error when password is blank", async () => {

        await loginPage.login('standard_user', '');
        await loginPage.bannerCheck(loginPage.emptyPasswordBanner);


    });


});