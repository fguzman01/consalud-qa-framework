package com.bice.pages;

import com.bice.config.ConfigManager;
import com.bice.config.WebDriverFactory;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import io.qameta.allure.Allure;
import java.io.ByteArrayInputStream;
import java.time.Duration;

public abstract class BasePage {

    protected WebDriver driver;
    protected WebDriverWait wait;
    protected ConfigManager config;

   public BasePage() {
        this.driver = WebDriverFactory.getDriver();
        this.config = ConfigManager.getInstance();
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(config.getExplicitWait()));
        PageFactory.initElements(driver, this);
    }

    // Metodo generico para realizar click en elemento 
    protected void clickElement(WebElement element) {
        try {
            wait.until(ExpectedConditions.elementToBeClickable(element));
            highlight(element);
            System.out.println("[CLICK] → " + describe(element));
            element.click();
        } catch (Exception e) {
            takeScreenshot("FAIL_click_" + describe(element));
            System.err.println("[ERROR] clickElement falló en: " + describe(element));
            throw new RuntimeException("No se pudo hacer click en: " + describe(element), e);
        }
    }

    // Metodo generico para realizar input en elemento
    protected void typeText(WebElement element, String text) {
        try {
            wait.until(ExpectedConditions.visibilityOf(element));
            element.clear();
            highlight(element);
            System.out.println("[TYPE] → " + describe(element) + " | valor: " + text);
            element.clear();
            element.sendKeys(text);
        } catch (Exception e) {
            takeScreenshot("FAIL_type_" + describe(element));
            System.err.println("[ERROR] typeText falló en: " + describe(element));
            throw new RuntimeException("No se pudo escribir en: " + describe(element), e);
        }
    }

    // Metodo generico para realizar obtener text del elemento
    public String getText(WebElement element) {
        try {
            wait.until(ExpectedConditions.visibilityOf(element));
            String text = element.getText().trim();
            System.out.println("[GET TEXT] → " + describe(element) + " | texto: " + text);
            return text;
        } catch (Exception e) {
            takeScreenshot("FAIL_get_" + describe(element));
            System.err.println("[ERROR] getText falló en: " + describe(element));
            throw new RuntimeException("No se pudo obtener texto de: " + describe(element), e);
        }
    }

    // Metodo generico para revisar display de elemento
    protected boolean isDisplayed(WebElement element) {
        try {
            return element.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    // Navegar a url 
    public void navigateTo(String url) {
        System.out.println("[NAVIGATE] → " + url);
        driver.get(url);
    }

    

    // ── Métodos internos de apoyo ─────────────────────────────────────────

    
    // Destacar elemento a interactuar
    private void highlight(WebElement element) {
        try {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            js.executeScript("arguments[0].style.border='3px solid red'", element);
        } catch (Exception ignored) {}
    }

    // Describir en print elemento
    private String describe(WebElement element) {
        try {
            String tag  = element.getTagName();
            String id   = element.getAttribute("id");
            String name = element.getAttribute("name");
            String text = element.getText().trim();

            if (id != null && !id.isEmpty())   return tag + "#" + id;
            if (name != null && !name.isEmpty()) return tag + "[name=" + name + "]";
            if (!text.isEmpty())                return tag + "['" + text + "']";
            return tag;
        } catch (Exception e) {
            return "elemento desconocido";
        }
    }

    public void takeScreenshot(String name) {
    try {
        TakesScreenshot ts = (TakesScreenshot) driver;
        byte[] screenshot = ts.getScreenshotAs(OutputType.BYTES);
        Allure.addAttachment(name, new ByteArrayInputStream(screenshot));
    } catch (Exception e) {
        System.err.println("[ERROR] Screenshot fallido: " + e.getMessage());
    }
}



}