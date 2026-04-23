import { test as base } from "@playwright/test";
import { LoginPage } from "../Pages/login.page";
import { InventoryPage } from "../Pages/inventory.page";



export const test = base.extend<{ loggedInPage: InventoryPage }>({
    
  loggedInPage: async ({ page }, use) => {

    const loginPage = new LoginPage(page);
    await loginPage.openLoginpage();
    await loginPage.login('standard_user', 'secret_sauce');

    const inventoryPage = new InventoryPage(page);

    await use(inventoryPage);
  }
});