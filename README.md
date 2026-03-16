# Closeout Test Automation Project

1️⃣ Project description
Automated **UI and API tests** for the Closeout application using **Playwright + TypeScript**.

---

2️⃣ Technologies

- Playwright
- TypeScript
- Node.js
- Playwright Test Runner
- REST API testing
- dotenv (environment configuration)

---

3️⃣ Setup

Install dependencies:

```bash
npm install
npx playwright install

Create a .env file in the project root:

API_BASE_URL=https://closeout-r1.enetelsolutions.com/ 
BASE_URL=https://closeout-r1fe.enetelsolutions.com/
DEVICE_ID=test-device
APP_USERNAME=your_username
APP_PASSWORD=your_password

---

4️⃣ Run tests

Run all tests:
npx playwright test

Run UI tests:
npm run tests:ui

Run API tests:
npm run tests:api

Run in headed mode:
npx playwright test --headed

---

5️⃣ Test coverage

UI
- Successful login
- Wrong credentials
- Upload photo without hardhat
- Upload photo with hardhat
- Upload already existing photo

API
- Upload placeholder photo – successful
- Upload placeholder photo – Unauthorized (401)
- Upload placeholder photo – Not Found (404)

---

6️⃣ Test data

Images used in tests are stored in: test-data/