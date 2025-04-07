const { test, expect } = require('@playwright/test');
//const { allure } = require('allure-playwright');

test.describe('ParaBank Navigation Menu Tests', () => {
  let loginPage;
  let homePage;
  let userData;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const registerPage = new (require('../../pages/RegisterPage'))(page);
    loginPage = new (require('../../pages/LoginPage'))(page);
    
    await page.goto('/');
    await page.click('text=Register');
    userData = await registerPage.registerNewUser();
    await context.close();
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new (require('../../pages/LoginPage'))(page);
    homePage = new (require('../../pages/HomePage'))(page);
    await page.goto('/');
    await loginPage.login(userData.username, userData.password);
  });

  test('should verify all global navigation menu items work correctly', async ({ page }) => {
    await test.step('Verify Home link navigation', async () => {
      await page.click('text=Home');
      await expect(page).toHaveURL(/.*overview\.htm/);
      await expect(page.locator('h1.title')).toHaveText('Accounts Overview');
    });

    await test.step('Verify About Us link navigation', async () => {
      await page.click('text=About Us');
      await expect(page).toHaveURL(/.*about\.htm/);
      await expect(page.locator('h1.title')).toHaveText('ParaSoft Demo Website');
    });

    await test.step('Verify Services link navigation', async () => {
      await page.click('text=Services');
      await expect(page).toHaveURL(/.*services\.htm/);
      await expect(page.locator('h1.title')).toHaveText('Available Bookstore SOAP services:');
    });

    await test.step('Verify Products link navigation', async () => {
      await page.click('text=Products');
      await expect(page).toHaveURL('https://www.parasoft.com/products/');
      // Verify we're on the Parasoft products page
      await expect(page.locator('h1')).toContainText('Parasoft Solutions');
    });

    await test.step('Verify Locations link navigation', async () => {
      await page.click('text=Locations');
      await expect(page).toHaveURL(/.*locations\.htm/);
      await expect(page.locator('h1.title')).toHaveText('Contact Us');
    });

    await test.step('Verify Admin Page link navigation', async () => {
      await page.click('text=Admin Page');
      await expect(page).toHaveURL(/.*admin\.htm/);
      await expect(page.locator('h1.title')).toHaveText('Administration');
    });
  });

  test('should verify left navigation panel links work correctly', async ({ page }) => {
    await test.step('Verify Open New Account link', async () => {
      await homePage.navigateToOpenNewAccount();
      await expect(page).toHaveURL(/.*openaccount\.htm/);
      await expect(page.locator('h1.title')).toHaveText('Open New Account');
    });

    await test.step('Verify Accounts Overview link', async () => {
      await homePage.navigateToAccountOverview();
      await expect(page).toHaveURL(/.*overview\.htm/);
      await expect(page.locator('h1.title')).toHaveText('Accounts Overview');
    });

    await test.step('Verify Transfer Funds link', async () => {
      await homePage.navigateToTransferFunds();
      await expect(page).toHaveURL(/.*transfer\.htm/);
      await expect(page.locator('h1.title')).toHaveText('Transfer Funds');
    });

    await test.step('Verify Bill Pay link', async () => {
      await homePage.navigateToBillPay();
      await expect(page).toHaveURL(/.*billpay\.htm/);
      await expect(page.locator('h1.title')).toHaveText('Bill Payment Service');
    });

    await test.step('Verify Find Transactions link', async () => {
      await page.click('text=Find Transactions');
      await expect(page).toHaveURL(/.*findtrans\.htm/);
      await expect(page.locator('h1.title')).toHaveText('Find Transactions');
    });

    await test.step('Verify Update Contact Info link', async () => {
      await page.click('text=Update Contact Info');
      await expect(page).toHaveURL(/.*updateprofile\.htm/);
      await expect(page.locator('h1.title')).toHaveText('Update Profile');
    });

    await test.step('Verify Request Loan link', async () => {
      await page.click('text=Request Loan');
      await expect(page).toHaveURL(/.*requestloan\.htm/);
      await expect(page.locator('h1.title')).toHaveText('Apply for a Loan');
    });
  });
});