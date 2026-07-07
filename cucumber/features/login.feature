@login

Feature: Login - Demoblaze

    Background: 
        Given el usuario esta en la pagina de inicio

    Scenario: Login exitoso con credenciales validas
        When el usuario inicia sesion con usuario "felipe.guzman.a@gmail.com" y contraseña "123456"
        Then el usuario debe ver su nombre en el nvbar

    Scenario: Login fallido con credenciales invalidas
        When el usuario inicia sesion con usuario "wrong@gmail.com" y contraseña "wrongpassword"
        Then debe aparecer un alerta con el mensaje "User does not exist."

