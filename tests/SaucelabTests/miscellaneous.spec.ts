import { test} from "@playwright/test";
import { LoginPage } from "../../Pages/login.page";
import { MiscellaneousPage } from "../../Pages/miscellaneous.page";


test.describe("Footer and External Links", () => {

    let loginPage: LoginPage;
    let miscellaneousPage: MiscellaneousPage;
    
    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        miscellaneousPage = new MiscellaneousPage(page);


        await loginPage.openLoginpage();
        await loginPage.login('standard_user', 'secret_sauce');
        

    });

        test("Verify Twitter social link is present and clickable", async () => {


            await miscellaneousPage.verifyTwitterLink();



        })

        test("Verify Facebook social link is present and clickable", async () => {


            await miscellaneousPage.verifyFacebookLink();


        })

        test("Verify LinkedIn social link is present and clickable", async () => {


            await miscellaneousPage.verifyLinkedInLink();


        })

        test("Verify footer copyright text is displayed", async () => {

            await miscellaneousPage.verifyFooterCopyrightText();



        })


    })