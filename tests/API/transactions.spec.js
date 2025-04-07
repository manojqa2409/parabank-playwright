const { test, expect } = require('@playwright/test');
//const { allure } = require('allure-playwright');
const ApiClient = require('../../utils/apiClient');

test.describe('ParaBank API Tests', () => {
  let apiClient;
  let accountId;
  const amount = 100;

  test.beforeAll(async () => {
    apiClient = new ApiClient();
  });

  test('should find transactions by amount', async () => {
    await test.step('Search transactions by amount', async () => {
      const response = await apiClient.get(`/accounts/${accountId}/transactions/amount/${amount}`);
      expect(response.status()).toBe(200);
      
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('transactions');
      expect(Array.isArray(responseBody.transactions)).toBeTruthy();
      
      if (responseBody.transactions.length > 0) {
        expect(responseBody.transactions[0].amount).toEqual(amount.toFixed(2));
      }
    });
  });

  test('should handle invalid transaction amount search', async () => {
    await test.step('Search with invalid amount', async () => {
      const invalidAmount = 'abc';
      const response = await apiClient.get(`/accounts/${accountId}/transactions/amount/${invalidAmount}`);
      expect(response.status()).toBe(400);
    });
  });
});