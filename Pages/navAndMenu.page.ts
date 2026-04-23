import type { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export class NavAndMenuPage {

    page: Page;
    openMenuButton: Locator;
    menu: Locator;
    menuAllItemsOption: Locator;
    menuAboutOption: Locator;
    menuLogoutOption: Locator;
    menuResetOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
        this.menu = page.locator('.bm-menu');
        this.menuAllItemsOption = page.locator('[data-test="inventory-sidebar-link"]');
        this.menuAboutOption = page.locator('[data-test="about-sidebar-link"]');
        this.menuLogoutOption = page.locator('[data-test="logout-sidebar-link"]');
        this.menuResetOption = page.locator('[data-test="reset-sidebar-link"]');


    }
    async clickOpenMenuButton() {
        await this.openMenuButton.click();
    }

    async verifyMenuOpened() {
        await expect(this.menu).toBeVisible();
    }

    async clickAllItemsOption() {
        await this.menuAllItemsOption.click();
    }
    async clickAboutOption() {
        await this.menuAboutOption.click();
    }

    async verfyAboutPageLoaded() {
        await expect(this.page).toHaveURL("https://saucelabs.com/")
        await this.page.close()
    }

    async clickLogoutOption() {
        await this.menuLogoutOption.click();
    }
    async verifyLogout() {
        await expect(this.page).toHaveURL("https://www.saucedemo.com/")
    }

    async clickResetOption() {
        await this.menuResetOption.click();
    }

}