package com.bice.web.steps;

import com.bice.config.ConfigManager;
import com.bice.config.WebDriverFactory;
import com.bice.data.DataProvider;
import com.bice.data.UserData;
import com.bice.flows.LoginFlow;
import com.bice.pages.LoginPage;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.Scenario;

public class LoginSteps {

    private LoginFlow loginFlow;
    private LoginPage loginPage;

    // Instanciar flos previo
    @Before
    public void setUp() {
        WebDriverFactory.initDriver();
        loginFlow = new LoginFlow();
        loginPage = new LoginPage();
    }

    // Quit driver al finalizar
    @After
    public void tearDown(Scenario scenario) {
        if (scenario.isFailed()) {
        loginPage.takeScreenshot("FAIL_" + scenario.getName());
        }
        WebDriverFactory.quitDriver();
    }

    @Given("el usuario navega al login")
    public void elUsuarioNavegaAlLogin() {
        loginPage.navigateTo(ConfigManager.getInstance().getBaseUrl());
    }

    @When("ingresa usuario {string} y password {string}")
    public void ingresaUsuarioYPassword(String username, String password) {
        loginFlow.loginAs(username, password);
    }

    @Then("debe ver la página de cuentas")
    public void debeVerLaPaginaDeCuentas() {
        assert loginPage.isLoginSuccessful() 
            : "Se esperaba mensaje de bienvenida pero no apareció";
    }

    @Then("debe ver un mensaje de error")
    public void debeVerUnMensajeDeError() {
        String alertMsg = loginPage.getAlertMessage();
        assert alertMsg.contains("not valid") 
            : "Se esperaba 'not valid' pero se obtuvo: " + alertMsg;
}
    
}
