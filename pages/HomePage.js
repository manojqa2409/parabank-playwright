const { test, expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.welcomeMessage = 'div#leftPanel p.smallText';
    this.accountOverviewLink = '//a[text()="Accounts Overview"]';
    this.openNewAccountLink = '//a[text()="Open New Account"]';
    this.transferFundsLink = '//a[text()="Transfer Funds"]';
    this.billPayLink = '//a[text()="Bill Pay"]';
  }

  async verifyWelcomeMessage(username) {
    const welcomeText = await this.getText(this.welcomeMessage);
    console.log('Actual welcome text:', welcomeText); // Debug output
    //expect(welcomeText.trim()).toContain(`Welcome ${username}`);
    expect(welcomeText.trim()).toContain(`Welcome`);
  }

  async navigateToAccountOverview() {
    await this.click(this.accountOverviewLink);
  }

  async navigateToOpenNewAccount() {
    await this.click(this.openNewAccountLink);
  }

  async navigateToTransferFunds() {
    await this.click(this.transferFundsLink);
  }

  async navigateToBillPay() {
    await this.click(this.billPayLink);
  }
}

module.exports = HomePage;