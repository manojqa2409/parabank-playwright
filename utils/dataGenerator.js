const { faker } = require('@faker-js/faker');

class DataGenerator {
  static generateUserData() {
    faker.locale = 'en_AU';
    const username = `fabric${faker.string.numeric(4)}`;
    return {
      username,
      password: 'Test@123',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: 'Australia'
      },
      phone: faker.phone.number('04## ### ###'),
      ssn: faker.string.numeric(3) + '-' + 
           faker.string.numeric(2) + '-' + 
           faker.string.numeric(4)
    };
  }

  static generateRandomAmount(min = 10, max = 1000) {
    return faker.number.int({ min, max });
  }

  static generateAustralianPhoneNumber() {
    return faker.phone.number('04## ### ###');
  }
}

module.exports = DataGenerator;