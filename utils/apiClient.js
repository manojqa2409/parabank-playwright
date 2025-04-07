const { request } = require('@playwright/test');
const config = require('../config/config.json');

class ApiClient {
  constructor() {
    this.baseUrl = config.apiUrl;
  }

  async get(endpoint, params = {}) {
    const context = await request.newContext();
    const response = await context.get(`${this.baseUrl}${endpoint}`, {
      params,
      headers: {
        'Accept': 'application/json'
      }
    });
    return response;
  }

  async post(endpoint, data = {}) {
    const context = await request.newContext();
    const response = await context.post(`${this.baseUrl}${endpoint}`, {
      data,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    return response;
  }
}

module.exports = ApiClient;