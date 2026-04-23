import type { Page, Locator } from "@playwright/test";
import {expect} from "@playwright/test"

export class LoginPage {
    page: Page;
    usernameTextbox: Locator;
    passWordTextbox: Locator;
    loginButton: Locator;
    lockedoutBanner: Locator;
    invaliduserBanner: Locator;
    emptyUsernameBanner: Locator;
    emptyPasswordBanner: Locator;
    noAccessBanner: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameTextbox = page.locator('[data-test="username"]');
        this.passWordTextbox = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.lockedoutBanner = page.locator('div').filter({ hasText: /^Epic sadface: Sorry, this user has been locked out\.$/ });
        this.invaliduserBanner = page.locator('div').filter({ hasText: /^Epic sadface: Username and password do not match any user in this service$/ });
        this.emptyUsernameBanner = page.locator('div').filter({ hasText: /^Epic sadface: Username is required$/ })
        this.emptyPasswordBanner = page.locator('div').filter({ hasText: /^Epic sadface: Password is required$/ })
        this.noAccessBanner =  page.locator('div').filter({ hasText: /^Epic sadface: You can only access '\/inventory\.html' when you are logged in\.$/ })
        
    }

    async openLoginpage() {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async login(username: string, password: string) {
        await this.usernameTextbox.fill(username);
        await this.passWordTextbox.fill(password);
        await this.loginButton.click();
    }

    async titleCheck(){
        await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html")
    }
    async bannerCheck(locator: Locator){
        await expect(locator).toBeVisible();
    }

    async tryInventoryURLWithoutLogin() {
        await this.page.goto("https://www.saucedemo.com/inventory.html")
        await expect(this.noAccessBanner).toBeVisible();
    }

    
}
