@api
Feature: Users API
  Scenario: Retrieve users
    When I request the users collection
    Then the users response is successful
