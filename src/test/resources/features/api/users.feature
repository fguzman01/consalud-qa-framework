@api
Feature: Users API - Reqres

  Scenario: Get list of users successfully
    Given url apiBaseUrl + '/users'
    And param page = 2
    When method GET
    Then status 200
    * print 'Status:', responseStatus
    * print 'Pagina:', response.page
    * print 'Total usuarios:', response.total
    And match response.page == 2
    And match response.data == '#[6]'
    And match each response.data contains { id: '#number', email: '#string' }