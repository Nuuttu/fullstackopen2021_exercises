describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Tes Tes',
      username: 'testes',
      password: 'keke'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('Loggin in', function() {
    it('front page can be opened', function() {
      cy.contains('Blogs')
    })

    it('front page contains button for login', function() {
      cy.contains('login').click()
      cy.get('#username').type('testes')
      cy.get('#password').type('keke')
      cy.get('#login-button').click()

      cy.contains('logged in as')
    })

    it('a new blog can be created', function() {
      cy.login({ username: 'testes', password: 'keke' })
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('url cypress')
      cy.contains('save blog').click()
      cy.contains('a blog created by cypress')
    })
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('wrong')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').should('contain', 'wrong credentials')
    cy.get('.error').should('contain', 'wrong credentials')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('.error').should('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'logged in')
  })

  describe('when logged in can create new blog', function() {
    beforeEach(function() {
      cy.login({ username: 'testes', password: 'keke' })
      cy.createBlog({ title: 'hahas', author: 'moromoro', url: 'lesmas', user: '' })
      cy.createBlog({ title: 'hassdaads', author: 'moro32moro', url: 'lesm2as', user: '' })
      cy.createBlog({ title: 'hahasvqwe', author: 'moro12moro', url: 'lesmas3', user: '' })
    })

    describe('several blogs appear', function() {

      it('blogs show', function () {
        cy.contains('hahas')
        cy.contains('hassdaads')
        cy.contains('hahasvqwe')
      })

      it('can like first blog', function() {
        cy.contains('view details').click()
        cy.get('.likeButton').click()
        cy.contains('Likes 1')
      })

      it('can delete own blog', function() {
        cy.get('html').should('contain', 'hahasvqwe')
        cy.contains('hahasvqwe').contains('view details').click()
        cy.contains('Delete').click()
        cy.get('html').should('not.contain', 'hahasvqwe')
      })

      it.only('blogs are shown in like order', function() {
        cy.get('.blogSpace:first').should('contain', 'hahas')
        cy.contains('hahas').contains('view details').click()
        cy.get('.likeButton').click()
        cy.get('.thlikes').contains('Likes 1')
        cy.visit('http://localhost:3000')
        cy.get('.blogSpace:first').should('contain', 'hahas')
        cy.contains('hassdaads').contains('view details').click()
        cy.get('.likeButton').click()
        cy.get('.thlikes').contains('Likes 1')
        cy.get('.likeButton').click()
        cy.get('.thlikes').contains('Likes 2')
        cy.get('.likeButton').click()
        cy.visit('http://localhost:3000')
        cy.get('.blogSpace:first').should('contain', 'hassdaads')
      })
    })
  })
})