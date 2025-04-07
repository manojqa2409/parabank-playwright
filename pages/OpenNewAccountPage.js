const BasePage = require('./BasePage');

class OpenNewAccountPage extends BasePage {
  constructor(page) {
    super(page);
    //this.accountTypeDropdown = page.locator('#type');
    //this.fromAccountDropdown = page.locator('#fromAccountId');
    //this.openAccountButton = 'input[value="Open New Account"]';
    //this.accountOpenedMessage = 'div#rightPanel h1.title';
    //this.newAccountId = 'a#newAccountId';

    this.accountTypeDropdown = page.locator('#type');
    this.fromAccountDropdown = page.locator('#fromAccountId');
    this.openNewAccountButton = page.locator('input.button[value="Open New Account"]');
    this.newAccountId = page.locator('#newAccountId');
    this.accountOpenedMessage = page.locator('#rightPanel > div > div > p:nth-child(2)');
    this.accountLink = page.locator(`a[href*='activity.htm']`);


  }

  async openSavingsAccount(fromAccountId) {
    //await this.page.waitForSelector(this.fromAccountDropdown, { visible: true });
    // await this.page.selectOption(this.accountTypeDropdown, { label: 'SAVINGS' });
    // await this.page.selectOption(this.fromAccountDropdown, { value: fromAccountId });
    // await this.click(this.openAccountButton);
    // await this.waitForElement(this.accountOpenedMessage);
    
    // const newAccountId = await this.getText(this.newAccountId);
    // return newAccountId;

    await this.accountTypeDropdown.selectOption('1'); // 1 is the value for SAVINGS
    const firstFromAccount = await this.fromAccountDropdown.locator('option').first();
    await this.fromAccountDropdown.selectOption(firstFromAccount);
    await this.openNewAccountButton.click();
    await this.page.waitForSelector('#newAccountId');
    const newAccountId = await this.newAccountId.innerText();
    return newAccountId;
  }
}

module.exports = OpenNewAccountPage;