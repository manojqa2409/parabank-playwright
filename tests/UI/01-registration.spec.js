const { test, expect } = require('@playwright/test');
//const { allure } = require('allure-playwright');
//const{allure} = require('@allure-playwright/allure-playwright');
const DataGenerator = require('../../utils/dataGenerator');

test.describe('ParaBank User Registration and Login', () => {
  let registerPage;
  let loginPage;
  let homePage;
  let userData;
  let openNewAccountPage;
  let newAccountId;
  let accountsOverviewPage;
  let transferFundsPage;
  let fromAccountId;
  let toAccountId;
  let billPayPage;
  const initialAmount = DataGenerator.generateRandomAmount(100, 500);


  test.beforeEach(async ({ page }) => {
    registerPage = new (require('../../pages/RegisterPage'))(page);
    loginPage = new (require('../../pages/LoginPage'))(page);
    homePage = new (require('../../pages/HomePage'))(page);
    openNewAccountPage = new (require('../../pages/OpenNewAccountPage'))(page);
    accountsOverviewPage = new (require('../../pages/AccountsOverviewPage'))(page);
    transferFundsPage = new (require('../../pages/TransferFundsPage'))(page);
    billPayPage = new (require('../../pages/BillPayPage'))(page);
    await page.goto('/');
  });

  test('should register a new user and login successfully', async ({ page }) => {
    
    /********************* Registration & Login - Pass *********************/
    
    await test.step('Navigate to registration page', async () => {
      await page.click('text=Register');
      await expect(page).toHaveURL(/.*register\.htm/);
    });

    await test.step('Register new user', async () => {
      userData = await registerPage.registerNewUser();
      await expect(page).toHaveURL(/.*register\.htm/);
    });

    await test.step('Verify welcome message', async () => {
      await homePage.verifyWelcomeMessage(userData.username);
    });

    await test.step('Logout and login again', async () => {
      await page.click('text=Log Out');
      await loginPage.login(userData.username, userData.password);
      await homePage.verifyWelcomeMessage(userData.username);

      // await homePage.navigateToOpenNewAccount();
      // await expect(page).toHaveURL(/.*openaccount\.htm/);
    });

    /********************* Open New Account - Pass *********************/

    await test.step('Navigate to open new account page', async () => {
      await page.click('text=Log Out');
      //await page.goto('/');

      await loginPage.login(userData.username, userData.password);
      //await waitForElement('text=Open New Account');
      await homePage.navigateToOpenNewAccount();
      await expect(page).toHaveURL(/.*openaccount\.htm/);
    });

    await test.step('Open new savings account', async () => {
      newAccountId = await openNewAccountPage.openSavingsAccount('');
      expect(newAccountId).toBeTruthy();
    });

    /********************* Account Overview - Pass *********************/

    await test.step('Verify account appears in overview', async () => {
      await homePage.navigateToAccountOverview();
      const accountIds = await accountsOverviewPage.getAccountIds();
      console.log('debug accountIds on  spec file', accountIds);
      expect(accountIds).toContain(newAccountId);
    });

    /********************* Transfer Funds - Pass *********************/

    await test.step('Create two accounts for transfer', async () => {
      await homePage.navigateToOpenNewAccount();
      const account1 = await openNewAccountPage.openSavingsAccount('');
      console.log('debug account1 create for transfer', account1);
      fromAccountId = account1;

      await homePage.navigateToOpenNewAccount();
      const account2 = await openNewAccountPage.openSavingsAccount('');
      console.log('debug account2 create for transfer', account2);
      toAccountId = account2;

      await homePage.navigateToAccountOverview();
      const accountIds = await accountsOverviewPage.getAccountIds();
      console.log('debug accountIds on  spec file for Transfer Funds', accountIds);
      expect(accountIds).toContain(account1);
      expect(accountIds).toContain(account2);
    });

    await test.step('Transfer funds between accounts', async () => {
      const transferAmount = DataGenerator.generateRandomAmount(10, 100);
      console.log('debug transferAmount', transferAmount);
      await homePage.navigateToTransferFunds();
      //console.log('Manoj 1 - Transfer Funds Page');
      await transferFundsPage.transferFunds(transferAmount, fromAccountId, toAccountId);
      //console.log('Manoj 2- Transfer Funds Page');
      await expect(page.getByText(`$${transferAmount}.00`)).toBeVisible();

    });


    /************************************* Bill Pay Page - Inprogress **************************/

    await test.step('Pay bill from account', async () => {
      const billAmount = DataGenerator.generateRandomAmount(10, 100);
      await homePage.navigateToBillPay();
      await billPayPage.payBill(newAccountId, billAmount);
      await expect(page.getByText(`Bill Payment to`)).toBeVisible();
    });

  });

});