@login

Feature: Login - Demoblaze

    Background: 
        Given el usuario esta en la pagina de inicio

    Scenario: Login exitoso con credenciales validas
        When el usuario inicia sesion con usuario "felipe.guzman.a@gmail.com" y contraseña "123456"
        Then el usuario debe ver su nombre en el nvbar


    Scenario: Login exitoso redirige a la pagina principal
        When el usuario inicia sesion con usuario "felipe.guzman.a@gmail.com" y contraseña "123456"
        Then el titulo de la pagina debe ser "STORE"
    
    Scenario: Cerrar modal de login
        When el usuario abre el modal de login
        Then el usuario cierra el modal
        And el modal de login no debe ser visible

    Scenario: Verificar que el boton de login esta disponible en la pagina
        Then el boton de login debe estar visible
    
    Scenario: Login y logout exitoso
        When el usuario inicia sesion con usuario "felipe.guzman.a@gmail.com" y contraseña "123456"
        Then el usuario debe ver su nombre en el nvbar
        When el usuario hace logout
        Then el boton de login debe estar visible

