**Key Files & Their Roles**
**package.json**

Contains project metadata, dependencies (playwright, allure-playwright, @faker-js/faker), and scripts for test execution and reporting.

Defines commands like test, report, etc.

**playwright.config.js**

Playwright configuration file specifying browsers, test directory, timeout settings, and reporter configurations (e.g., Allure).

May include projects for multi-browser testing (Chromium, Firefox, WebKit).

**tests/ (or similar test directory)**

Contains test scripts (.spec.js or .test.js files) written in Playwright.

Tests may include UI flows, API calls, or database interactions for Parabank (a demo banking app).

**Helper Files (if any)**

**utils/ **– Utility functions (e.g., test data generation, API helpers).

**fixtures/** – Reusable test setups (e.g., login before tests).

Playwright-JavaScript installation in VSCode
===========================================================

1. Install Node.js (Check if Node.js is already installed in your computer by typing “**node –v**/ **node –version** and **npm –v** / **npm –version**”in command prompt). 

If it’s not available, you can easily install it from Install Node.js

2. Install Visual Studio Code (Install VS Code)

3. Install playwright with command - **npm install --save-dev @playwright/latest**

4. Install allure report - **npm install --save-dev @playwright/test allure-playwright ** OR **npm install -D allure-playwright**

5. Command Line for Allure report - **npm install -D allure-commandline**

6. Generate Allure report - **allure generate ./allure-results -o ./allure-results**

7. Open allure report - **allure open ./allure-results**
