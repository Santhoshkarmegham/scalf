@smoke
Feature: Sauce Demo shopping
  Scenario: Add a product to the cart
    Given I open the Sauce Demo application
    When I log in with valid Sauce Demo credentials
    And I add the first product to the cart
    Then the shopping cart should contain one item
