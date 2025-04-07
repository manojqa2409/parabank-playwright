const BasePage = require('./BasePage');
const DataGenerator = require('../utils/dataGenerator');

class BillPayPage extends BasePage {
  constructor(page) {
    super(page);
    this.payeeNameInput = 'input[name="payee.name"]';
    this.addressInput = 'input[name="payee.address.street"]';
    this.cityInput = 'input[name="payee.address.city"]';
    this.stateInput = 'input[name="payee.address.state"]';
    this.zipCodeInput = 'input[name="payee.address.zipCode"]';
    this.phoneInput = 'input[name="payee.phoneNumber"]';
    this.accountInput = 'input[name="payee.accountNumber"]';
    this.verifyAccountInput = 'input[name="verifyAccount"]';
    this.amountInput = 'input[name="amount"]';
    this.fromAccountDropdown = 'select[name="fromAccountId"]';
    this.sendPaymentButton = 'input[value="Send Payment"]';
    this.paymentCompleteMessage = 'div#rightPanel h1.title';
  }

  async payBill(accountId, amount) {
    const payeeData = DataGenerator.generateUserData();
    
    await this.type(this.payeeNameInput, `${payeeData.firstName} ${payeeData.lastName}`);
    await this.type(this.addressInput, payeeData.address.street);
    await this.type(this.cityInput, payeeData.address.city);
    await this.type(this.stateInput, payeeData.address.state);
    await this.type(this.zipCodeInput, payeeData.address.zipCode);
    await this.type(this.phoneInput, payeeData.phone);
    await this.type(this.accountInput, accountId);
    await this.type(this.verifyAccountInput, accountId);
    await this.type(this.amountInput, amount.toString());
    await this.page.selectOption(this.fromAccountDropdown, { value: accountId });
    
    await this.click(this.sendPaymentButton);
    await this.waitForElement(this.paymentCompleteMessage);
    
    return amount;
  }
}

module.exports = BillPayPage;