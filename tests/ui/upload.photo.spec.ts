import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../page-objects/loginPage';
import { DashboardPage } from '../../page-objects/dashboardPage';
import { ProjectPage } from '../../page-objects/projectPage';
import { createUniqueImage } from '../../utils/imageHelper';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe.serial('Upload photo test suite', () => {

test('Upload photo without hardhat', async ({ page }) => {

  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const project = new ProjectPage(page);

  await login.goto(process.env.BASE_URL!);

  await login.login(
    process.env.APP_USERNAME!,
    process.env.APP_PASSWORD!
  );

  await dashboard.openSideMenu('Control Panel');
  await dashboard.openProject('875');
  await dashboard.openSite('Test Site 7');
  await dashboard.openFolder('test photo');
  await dashboard.clickOnUploadButton();
  const uniqueImage = await createUniqueImage('no-hardhat.png');
  await project.uploadPhoto(uniqueImage);
  await project.clickOnDoneButton();
  await project.getValidationResult('rejected')
});


test('Upload photo with hardhat', async ({ page }) => {

  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const project = new ProjectPage(page);

  await login.goto(process.env.BASE_URL!);

  await login.login(
    process.env.APP_USERNAME!,
    process.env.APP_PASSWORD!
  );

  await dashboard.openSideMenu('Control Panel');
  await dashboard.openProject('875');
  await dashboard.openSite('Test Site 7');
  await dashboard.openFolder('test photo');
  await dashboard.clickOnUploadButton();
  const uniqueImage = await createUniqueImage('hardhat.png');
  await project.uploadPhoto(uniqueImage);
  await project.clickOnDoneButton();
  await project.getValidationResult('accepted')

  })


test('Upload already existing photo', async ({ page }) => {

  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const project = new ProjectPage(page);

  await login.goto(process.env.BASE_URL!);

  await login.login(
    process.env.APP_USERNAME!,
    process.env.APP_PASSWORD!
  );

  await dashboard.openSideMenu('Control Panel');
  await dashboard.openProject('875');
  await dashboard.openSite('Test Site 7');
  await dashboard.openFolder('test photo');
  await dashboard.clickOnUploadButton();
  await project.uploadPhoto('no-hardhat.png');
  await project.clickOnDoneButton();
  await project.getAlertMessage('Document is already uploaded')
})



});