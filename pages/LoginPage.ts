import { Page, Locator} from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    readonly loginModal: Locator;
    readonly linkLoginModal: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.loginModal = page.locator('#logInModal');
        this.linkLoginModal = page.locator('#login2');
        this.usernameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.loginButton = page.locator('[onclick="logIn()"]');
        this.closeButton = page.locator('//button[@onclick="logIn()"]/preceding-sibling::button');

    }

    async openLoginModal() {
        console.log('Opening login modal...');
        await this.linkLoginModal.click();
        await this.loginModal.waitFor({ state: 'visible' });
    }

    async inputUsername(username: string) {
        console.log(`Inputting username: ${username}`);
        await this.usernameInput.fill(username);
    }
    async inputPassword(password: string) {
        console.log(`Inputting password: ${password}`);
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        console.log('Clicking login button...');
        await this.loginButton.click();
    }

    async closeLoginModal() {
        console.log('Closing login modal...');
        await this.closeButton.click();
    }
}