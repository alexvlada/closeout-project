import { Page, Locator, expect } from '@playwright/test';
import path from 'path';

export class ProjectPage {
  readonly page: Page;
  readonly fileInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fileInput = page.locator('input[type="file"]');
  }

  async uploadPhoto(filePath: string) {
    await this.fileInput.waitFor({ state: 'attached', timeout: 15000 });
    await this.fileInput.setInputFiles(filePath);
  }

  async clickOnDoneButton() {
    await this.page.getByRole('button', { name: 'Done' }).click();
  }

  async getValidationResult(result: string) {
     await this.page.waitForLoadState('networkidle');     
     const rejectedIcon = this.page.locator('img[alt="'+result+'"]').first();
     await rejectedIcon.waitFor({ state: 'visible', timeout: 10000 }); 
     await expect(rejectedIcon).toBeVisible();
     
  }

  async getAlertMessage(message: string) {
    const alertText = this.page.locator('ngb-alert.alert-danger.show.fade div:has-text("'+message+'")');
    await expect(alertText).toBeVisible();
    const text = await alertText.textContent();
  }

}