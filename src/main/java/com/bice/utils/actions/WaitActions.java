package com.bice.utils.actions;

import com.bice.config.WebDriverFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class WaitActions {

    private WaitActions() {}

    public static void waitForUrlContains(String urlFragment) {
        System.out.println("[WAIT] Esperando URL que contenga: " + urlFragment);
        new WebDriverWait(WebDriverFactory.getDriver(), Duration.ofSeconds(15))
            .until(ExpectedConditions.urlContains(urlFragment));
    }

    public static void waitForPageLoad(int seconds) {
    System.out.println("[WAIT] Esperando carga de página: " + seconds + "s max");
    try {
        new WebDriverWait(WebDriverFactory.getDriver(), Duration.ofSeconds(seconds))
            .until(driver -> {
                try {
                    Object result = ((org.openqa.selenium.JavascriptExecutor) driver)
                        .executeScript("return document.readyState");
                    return result != null && result.equals("complete");
                } catch (Exception e) {
                    return true; // si hay alert u otro error, asumimos página lista
                }
            });
    } catch (Exception e) {
        System.out.println("[WAIT] Página lista o alert presente");
    }
}
}