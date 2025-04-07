class BasePage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate(path) {
      await this.page.goto(path);
    }
  
    async getTitle() {
      return await this.page.title();
    }
  
    async waitForElement(selector, timeout = 10000) {
      await this.page.waitForSelector(selector, { state: 'visible', timeout });
    }
  
    async click(selector) {
      await this.waitForElement(selector);
      await this.page.click(selector);
    }
  
    async type(selector, text) {
      await this.waitForElement(selector);
      await this.page.fill(selector, text);
    }
  
    async getText(selector) {
      await this.waitForElement(selector);
      return await this.page.innerText(selector);
    }
  }
  
  module.exports = BasePage;