package com.bice.pages;

import org.openqa.selenium.Alert;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class LoginPage extends BasePage {

    @FindBy(name = "uid")
    private WebElement userField;

    @FindBy(name = "password")
    private WebElement passwordField;

    @FindBy(name = "btnLogin")
    private WebElement loginButton;

    @FindBy(xpath = "//marquee[contains(text(),'Welcome To Manager')]")
    private WebElement welcomeMessage;

    public LoginPage() {
        super();
    }

    //Ingresar username
    public void enterUsername(String username) {
        typeText(userField, username);
    }

    // Ingresar contraseña
    public void enterPassword(String password) {
        typeText(passwordField, password);
    }

    // Click boton del login
    public void clickLogin() {
        clickElement(loginButton);
    }

    //Valida login exitoso
    public boolean isLoginSuccessful() {
        try {
            return isDisplayed(welcomeMessage);
        } catch (Exception e) {
            return false;
        }
    }

    //Captura alerta al fallar login
    public String getAlertMessage() {
        try {
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            String message = alert.getText();
            Thread.sleep(2000); // 2 segundos para verlo
            alert.accept();
            return message;
        } catch (Exception e) {
            return "";
        }
    }

    public boolean isLoginPageDisplayed() {
        return isDisplayed(userField);
    }
}