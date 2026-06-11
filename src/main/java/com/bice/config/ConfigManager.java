package com.bice.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigManager {

    private static ConfigManager instance;
    private final Properties properties;

    private ConfigManager() {
        properties = new Properties();
        String env = System.getProperty("env", "dev");
        String fileName = "config-" + env + ".properties";

        try (InputStream input = getClass().getClassLoader().getResourceAsStream(fileName)) {
            if (input == null) {
                throw new RuntimeException("No se encontró el archivo: " + fileName);
            }
            properties.load(input);
        } catch (IOException e) {
            throw new RuntimeException("Error cargando configuración: " + fileName, e);
        }
    }

    public static synchronized ConfigManager getInstance() {
        if (instance == null) {
            instance = new ConfigManager();
        }
        return instance;
    }

    public String get(String key) {
        return properties.getProperty(key);
    }

    public String getBaseUrl() {
        return get("base.url");
    }

    public String getApiBaseUrl() {
        return get("api.base.url");
    }

    public String getBrowser() {
        return System.getProperty("browser", get("browser"));
    }

    public boolean isHeadless() {
        return Boolean.parseBoolean(System.getProperty("headless", get("headless")));
    }

    public int getExplicitWait() {
        return Integer.parseInt(get("explicit.wait"));
    }
}