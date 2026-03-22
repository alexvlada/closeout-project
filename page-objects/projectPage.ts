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
   
    const firstCheckbox: Locator = this.page.locator('p-checkbox').first();
    let icon: Locator;
    
    
    if (result === 'accepted') {
      icon = firstCheckbox.locator('xpath=..//img[@alt="accepted" or alt="rejected"]');
    } else {
      icon = firstCheckbox.locator('xpath=..//img[alt="accepted" or @alt="rejected"]');
    }
   
    await icon.waitFor({ state: 'visible', timeout: 30000 });
    const alt = await icon.getAttribute('alt');
    console.log('Validation result:', alt);

    expect(alt).toBe(result);
  }

  async getAlertMessage(message: string) {
    const alertText = this.page.locator('ngb-alert.alert-danger.show.fade div:has-text("'+message+'")');
    await expect(alertText).toBeVisible();
    const text = await alertText.textContent();
  }

}