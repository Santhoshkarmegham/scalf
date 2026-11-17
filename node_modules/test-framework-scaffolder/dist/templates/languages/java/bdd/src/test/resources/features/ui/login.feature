@smoke
Feature: Login
  Scenario: Successful login
    Given I navigate to the application
    When I login with valid credentials
    Then I should see the inventory page
