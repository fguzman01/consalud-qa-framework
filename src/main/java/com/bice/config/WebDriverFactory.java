package com.bice.config;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

public class WebDriverFactory {

    // Manejar test en paralelo para no campartir driver
    private static final ThreadLocal<WebDriver> driverThread = new ThreadLocal<>();

    private WebDriverFactory() {}

    public static void initDriver() {
        // Silencia los warnings de CDP de Selenium
        java.util.logging.Logger.getLogger("org.openqa.selenium").setLevel(java.util.logging.Level.OFF);
        java.util.logging.Logger.getLogger("io.netty").setLevel(java.util.logging.Level.OFF);
        
        // Variables de conf
        ConfigManager config = ConfigManager.getInstance();
        String browser = config.getBrowser().toLowerCase().trim();
        boolean headless = config.isHeadless();

        //Seleccion chrome headless
        WebDriver driver = switch (browser){
            case "chrome" -> createChrome(headless);
            default -> throw new IllegalArgumentException("Browser no soportado" + browser);
        };

        //Timers y expand browser
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));
        driver.manage().window().maximize();

        //Setear confguraciones de driver
        driverThread.set(driver);
    }

    public static WebDriver getDriver() {
        return driverThread.get();
    }

    // Quite driver si hay error
    public static void quitDriver() {
        WebDriver driver = driverThread.get();
        if (driver != null) {
            driver.quit();
            driverThread.remove();
        }
    }

    // Creación driver segun opción no-headless - headless
    private static WebDriver createChrome(boolean headless) {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        if (headless) {
            options.addArguments("--headless=new");
        }
        options.addArguments("--no-sandbox", "--disable-dev-shm-usage");
        options.addArguments(
            "--disable-features=PasswordLeakDetection,PasswordManagerEnableLeakDetectionForUsersConsumer,AutofillServerCommunication"
        );

        Map<String, Object> prefs = new HashMap<>();
        prefs.put("credentials_enable_service", false);
        prefs.put("profile.password_manager_enabled", false);
        prefs.put("profile.password_manager_leak_detection", false);
        prefs.put("password_manager_leak_detection", false);
        options.setExperimentalOption("prefs", prefs);

        options.addArguments("--disable-save-password-bubble");

        return new ChromeDriver(options);
    }


}