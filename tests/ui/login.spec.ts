import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/loginPage';
import * as dotenv from 'dotenv';
dotenv.config();

test('Successfull login', async ({ page }) => {

  const login = new LoginPage(page);

  await login.goto(process.env.BASE_URL!);
  await login.login(process.env.APP_USERNAME!,
                    process.env.APP_PASSWORD!);

 await expect(page.locator('text=Dashboard')).toBeVisible();

});

test('Wrong credentials', async ({ page }) => {

  const login = new LoginPage(page);

  await login.goto(process.env.BASE_URL!);
  await login.login('xxxxxxxxxxxx',
                    'yyyyyyyyyyyy');

  await expect(page.locator('span.text-danger'))
  .toHaveText(/Failed to sign in/);

});