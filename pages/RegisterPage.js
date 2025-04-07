const BasePage = require('./BasePage');
const DataGenerator = require('../utils/dataGenerator');

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = 'input[name="customer.firstName"]';
    this.lastNameInput = 'input[name="customer.lastName"]';
    this.addressInput = 'input[name="customer.address.street"]';
    this.cityInput = 'input[name="customer.address.city"]';
    this.stateInput = 'input[name="customer.address.state"]';
    this.zipCodeInput = 'input[name="customer.address.zipCode"]';
    this.phoneInput = 'input[name="customer.phoneNumber"]';
    this.ssnInput = 'input[name="customer.ssn"]';
    this.usernameInput = 'input[name="customer.username"]';
    this.passwordInput = 'input[name="customer.password"]';
    this.confirmPasswordInput = 'input[name="repeatedPassword"]';
    this.registerButton = 'input[value="Register"]';
  }

  async registerNewUser() {
    const userData = DataGenerator.generateUserData();
    
    await this.type(this.firstNameInput, userData.firstName);
    await this.type(this.lastNameInput, userData.lastName);
    await this.type(this.addressInput, userData.address.street);
    await this.type(this.cityInput, userData.address.city);
    await this.type(this.stateInput, userData.address.state);
    await this.type(this.zipCodeInput, userData.address.zipCode);
    await this.type(this.phoneInput, userData.phone);
    await this.type(this.ssnInput, userData.ssn);
    await this.type(this.usernameInput, userData.username);
    await this.type(this.passwordInput, userData.password);
    await this.type(this.confirmPasswordInput, userData.password);
    
    await this.click(this.registerButton);
    
    return userData;
  }
}

module.exports = RegisterPage;