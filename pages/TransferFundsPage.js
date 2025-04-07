const BasePage = require('./BasePage');

class TransferFundsPage extends BasePage {
  constructor(page) {
    super(page);
    this.amountInput = 'input#amount';
    this.fromAccountDropdown = '#fromAccountId';
    this.toAccountDropdown = '#toAccountId';
    this.transferButton = '//input[@value="Transfer"]';
    //this.transferCompleteMessage = 'div#rightPanel h1.title';
    this.transferCompleteMessage = '//div[@id="showResult"]';

    //-->this.fromAccountDropdown = page.locator('#fromAccountId');
    //-->this.toAccountDropdown = page.locator('#toAccountId');
    //-->this.transferButton = page.locator('input.button[value="Transfer"]');

  }

  async transferFunds(amount, fromAccountId, toAccountId) {
    await this.type(this.amountInput, amount.toString());
    await this.page.selectOption(this.fromAccountDropdown, { value: fromAccountId });
    await this.page.selectOption(this.toAccountDropdown, { value: toAccountId });
    await this.click(this.transferButton);
    const successTransferMessageawait = await this.waitForElement(this.transferCompleteMessage);
    console.log('debug successTransferMessageawait', successTransferMessageawait);
  }
}

module.exports = TransferFundsPage;