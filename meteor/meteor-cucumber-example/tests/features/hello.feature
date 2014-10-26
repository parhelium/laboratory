@zombie
Feature: Display hello world on the home page

  Scenario: Go to the home page and see the hello world message
    Given the application has been created
    When I go to the home page and enter "Micha" in the name field
    Then I should see "Hello Micha!" on the page