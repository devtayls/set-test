/// <reference types="cypress" />

//This is a series of tests for our TODOmvc app
//You will need to fix each test

// RESOURECES:
// https://docs.cypress.io/api/table-of-contents

/**
 * Duplicating the code to add todo's to the list is not very DRY. We should make a commnand to do that for us
 *
 * TODO: add command 'createTodo'
 * TODO: log the command in the cypress test pane
 *  WHERE:
 *  --> name === action
 *  --> message === todo
 *
 *  Because we want to keep our log clean, make sure to only log the above, not any of the cypress commands
 * https://docs.cypress.io/api/commands/log
 */
Cypress.Commands.add('createTodo', () => {})

describe('functional requirements', () => {
  /**
   * TODO: visit the relative path of the baseUrl
   */
  beforeEach(() => {})

  /**
   * TODO: Create duplicate items
   * TODO: Validate that the items are seperate entities
   */
  it('allows duplicate list items', () => {})

  /**
   * TODO: Complete a todo
   * TODO: Validate the completed UI element
   */
  it('completes a todo', () => {})

  /**
   * When I attempt to add a todo
   * And the todo is an empty string
   * Then the application will throw an error
   *
   * TODO: Verify the application throws an error
   * TODO: Validate the contents of the the error
   *
   * https://docs.cypress.io/api/events/catalog-of-events#App-Events
   */
  it('does not allow adding blank todos', () => {})
})

/**
 * Cypress allows to stub, mock and intercept network requests.
 * Using those methods, fulfill the criterious below.
 */
context('network requests', () => {
  /**
   * When I send a /post request to the server
   * And I hit the right endpoint
   * And I have the correct format
   * Then it should add a todo
   *
   * TODO: make the request: with a post method or through the GUI
   * TODO: intercept the request
   * TODO: Validate that items are added with the correct properties.
   *
   * https://docs.cypress.io/api/commands/intercept
   */
  describe('/post requests', () => {})

  /**
   * TODO's persist in the database, we'll need to check that we can reset the state of the app
   *
   * When I send a post request to the server
   * And I hit the right endpoint
   * And I have the correct format
   * Then it should reset the todos in the database
   *
   * TODO: Send a request to /reset
   * TODO: Validates that it reset the state of the app
   */
  context('reset data using XHR call', () => {})

  describe('/get requests', () => {
    /**
     * When I reset the database
     * And reload the application
     * Then there should be no todo entries.
     *
     * TODO: make a get reuqest to /todos
     * TODO: intercept the request
     * TODO: Validate that the default state is to return zero items
     */
    it('reset endpoint clears persistence', () => {})
  })
})
