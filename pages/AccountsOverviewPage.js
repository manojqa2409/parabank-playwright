const BasePage = require('./BasePage');

class AccountsOverviewPage extends BasePage {
  constructor(page) {
    super(page);
    this.accountsTable = '//table[@id="accountTable"]';
    this.accountRows = '//table[@id="accountTable"]/tbody/tr';
    this.accountBalance = '//table[@id="accountTable"]/tbody/tr/td[2]';

    /*Account Overview Locators*/
    this.accountOverview = page.locator('//div[@id="leftPanel"]//a[contains(text(), "Accounts Overview")]');
    this.accountTableRows = page.locator('table#accountTable tbody tr');
  }

  async verifyAccountBalance(accountId, expectedBalance) {
    await this.waitForElement(this.accountsTable);
    const balance = await this.page.locator(`tr:has-text("${accountId}") td:nth-child(2)`).innerText();
    expect(balance).toContain(expectedBalance);
  }

  async getAccountIds() {
    const accounts = [];
    const rows = await this.page.locator(this.accountRows).count();
    console.log('debug rows', rows);
    for (let i = 0; i < rows - 1; i++) {
      //const accountId = await this.page.locator(this.accountRows).nth(i).locator('td a').innerText();
      const accountId = await this.page.locator(`${this.accountsTable}/tbody/tr[${i + 1}]/td[1]/a`).innerText();
      console.log('debug accountId', accountId);
      accounts.push(accountId);
    }
    return accounts;
  }
}

module.exports = AccountsOverviewPage;