// flows/LoginFlow.ts
import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { attachScreenshot } from '../helpers/ScreenshotHelper';

export class LoginFlow {
    private loginPage: LoginPage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
    }

    async loginWithCredentials(username: string, password: string) {
        console.log('Starting login flow...');
        await this.loginPage.openLoginModal();
        await this.loginPage.inputUsername(username);
        await this.loginPage.inputPassword(password);
        await this.loginPage.clickLoginButton();
        console.log('Login flow completed.');
        //await attachScreenshot(this.loginPage.page, 'Login Screenshot');
    }
}