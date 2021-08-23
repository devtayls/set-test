/// <reference types="cypress" />

//This is a series of tests for our TODOmvc app
//You will need to fix each test

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
 */
Cypress.Commands.add('createTodo', (todo) => {
  const cmd = Cypress.log({
    name: 'create todo',
    message: todo
  })

  cy.get('.new-todo', { log: false })
    .type(`${todo}{enter}`, { log: false })
    .then(($el) => {
      cmd.set({ $el }).snapshot().end()
    })
})

describe('functional requirements', () => {
  /**
   * TODO: visit the relative path of the baseUrl
   */
  beforeEach(() => {
    cy.visit('localhost:3000')
  })

  /**
   * When I enter a todo
   * And I press enter
   * Then the todo is added to the list
   *
   * TODO: Create a todo
   * TODO: Validate the properties of the todo
   */
  it('creates a todo', () => {
    //@ts-expect-error
    cy.createTodo('my first todo')
  })

  /**
   * TODO: Create duplicate items
   * TODO: Validate that the items are seperate
   */
  it('allows duplicate list items', () => {
    //@ts-expect-error
    cy.createTodo('my first todo')
  })

  /**
   * TODO: Complete a todo
   * TODO: Validate the completed UI element
   */
  it('completes a todo', () => {
    //@ts-expect-error
    cy.createTodo('my first todo')
  })

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
  it('does not allow adding blank todos', () => {
    cy.createTodo(' ')
    cy.on('uncaught:exception', (e) => {
      // what will happen if this assertion fails?
      // will the test fail?
      const flag = expect(e.message).to.include('Cannot add a blank todo')
      // return false
      return !flag
    })
  })
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
   */
  describe('/post requests', () => {
    it('posts new item to the server', () => {
      cy.intercept('POST', '/todos').as('new-item')
      cy.visit('/')
      cy.get('.new-todo').type('test api{enter}')
      cy.wait('@new-item').its('request.body').should('have.contain', {
        title: 'test api',
        completed: false
      })
    })

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
    context('reset data using XHR call', () => {
      // you can use separate "beforeEach" hooks or a single one
      beforeEach(() => {
        cy.request('POST', '/reset', {
          todos: []
        })
        cy.visit('/')
      })

      it('adds two items', () => {
        cy.get('li.todo').should('have.length', 0)

        cy.createTodo('first item')
        cy.createTodo('second item')

        cy.get('li.todo').should('have.length', 2)
      })
    })
  })

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
    it('starts with zero items (stubbed response)', () => {
      // start Cypress network server
      // spy on route `GET /todos`
      // THEN visit the page
      cy.intercept('GET', '/todos', []).as('todos')
      cy.visit('/')
      cy.wait('@todos') // wait for `GET /todos` response
        // inspect the server's response
        .its('response.body')
        .should('have.length', 0)
      // then check the DOM
      cy.get('li.todo').should('have.length', 0)
    })
  })
})
