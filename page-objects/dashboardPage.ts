import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {

  constructor(private page: Page) {}

  async openSideMenu(menuName: string) {
    await this.page.click('text='+ menuName);
  }
  
  async openProject(projectName: string) {
    await this.page.locator('span[title="'+projectName+'"]').click();
  }


  async openSite(siteName: string)  {
    const testSiteLocator = this.page.locator('div.d-flex.align-items-center.tw\\:me-auto', {
    hasText: siteName
  });
  await testSiteLocator.waitFor({ state: 'visible', timeout: 10000 });
  await testSiteLocator.click();
  }

  async openFolder(folderName: string)  {
   const testFolderLocator = this.page.locator('div.icon-height.d-flex.flex-column.justify-content-between', {
      hasText: folderName
    });
  await testFolderLocator.waitFor({ state: 'visible', timeout: 10000 });
  await testFolderLocator.click();
  }

  async clickOnUploadButton() {
    const uploadButton = this.page.locator('div[ng-reflect-ngb-tooltip="Upload document"]');
    await expect(uploadButton).toBeVisible({ timeout: 10000 });
    await uploadButton.click();
  }


}