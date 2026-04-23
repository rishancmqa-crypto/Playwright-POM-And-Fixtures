import { Page, Locator } from '@playwright/test';

export async function addToCart(
    page: Page,
    addButton: Locator,
    removeButton: Locator
) {
    if (await addButton.isVisible()) {
        await addButton.click();
    } else {
        await removeButton.click();
        await addButton.click();
    }
}