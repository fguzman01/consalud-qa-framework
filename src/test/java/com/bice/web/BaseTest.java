package com.bice.web;

import com.bice.config.WebDriverFactory;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;

//Preparar driver antes y despues de cada ejecución
public class BaseTest {

    @BeforeEach
    public void setUp() {
        WebDriverFactory.initDriver();
    }

    @AfterEach
    public void tearDown() {
        WebDriverFactory.quitDriver();
    }
}