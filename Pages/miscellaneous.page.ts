import type { Page, Locator } from "@playwright/test"
import { expect } from "@playwright/test";

export class MiscellaneousPage {

    page: Page;
    twitterButton: Locator;
    facebookButton: Locator;
    linkdnButton: Locator;
    footerCopyright: Locator;

    constructor(page: Page) {
        this.page = page;
        this.twitterButton = page.locator('[data-test="social-twitter"]');
        this.facebookButton = page.locator('[data-test="social-facebook"]');
        this.linkdnButton = page.locator('[data-test="social-linkedin"]');
        this.footerCopyright = page.locator('[data-test="footer-copy"]');
    }

    async verifyTwitterLink() {

        const [twitter] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.twitterButton.click()
        ]);

        // Wait until the new page is fully loaded
        await twitter.waitForLoadState('load');

        // Assertion
        await expect(twitter).toHaveURL("https://x.com/saucelabs")

    }

    async verifyFacebookLink() {

        const [Facebook] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.facebookButton.click()
        ]);

        // Wait until the new page is fully loaded
        await Facebook.waitForLoadState('load');

        // Assertion
        await expect(Facebook).toHaveURL("https://www.facebook.com/saucelabs")
    }

    async verifyLinkedInLink() {

        const [LinkedIn] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.linkdnButton.click()
        ]);

        // Wait until the new page is fully loaded
        await LinkedIn.waitForLoadState('load');

        // Assertion
        await expect(LinkedIn.url()).toContain("linkedin.com");
    }

    async verifyFooterCopyrightText() {
        await expect(this.footerCopyright).toBeVisible();
    }
}

