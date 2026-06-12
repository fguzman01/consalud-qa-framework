@web
Feature: Login ParaBank

  Background:
    Given el usuario navega al login

  Scenario: Login exitoso con credenciales válidas
    When ingresa usuario "mngr662929" y password "AqYgEzY"
    Then debe ver la página de cuentas

  Scenario Outline: Login con múltiples usuarios
    When ingresa usuario "<usuario>" y password "<password>"
    Then debe ver la página de cuentas

    Examples:
      | usuario    | password |
      | mngr662929 | AqYgEzY  |
      | mngr662968 | AnYbYpU  |

  Scenario: Login con credenciales inválidas
    When ingresa usuario "mngr662929" y password "wrongpass"
    Then debe ver un mensaje de error

  Scenario: Login con usuario invalido desde DataProvider
    When el usuario invalido intenta ingresar
    Then debe ver un mensaje de error