const validEmail = 'test@example.com'
const validPassword = 'Strong123!'

describe('Login Formu', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Başarılı form doldurulduğunda submit edebiliyorum', () => {
    cy.get('[data-cy="email-input"]').type(validEmail)
    cy.get('[data-cy="password-input"]').type(validPassword)
    cy.get('[data-cy="terms-checkbox"]').check()
    cy.get('[data-cy="submit-button"]').should('not.be.disabled').click()
    cy.get('[data-cy="success-page"]').should('be.visible')
  })

  describe('Hatalı durumlar', () => {
    it('email yanlış girildiğinde', () => {
      cy.get('[data-cy="email-input"]').type('yanlis-email')
      cy.get('[data-cy="password-input"]').type(validPassword)
      cy.get('[data-cy="terms-checkbox"]').check()

      cy.get('.error-message').should('have.length', 1)
      cy.get('[data-cy="email-error"]')
        .should('be.visible')
        .and('contain', 'Geçerli bir email adresi giriniz.')
      cy.get('[data-cy="submit-button"]').should('be.disabled')
    })

    it('email ve password yanlış girildiğinde', () => {
      cy.get('[data-cy="email-input"]').type('yanlis-email')
      cy.get('[data-cy="password-input"]').type('123')
      cy.get('[data-cy="terms-checkbox"]').check()

      cy.get('.error-message').should('have.length', 2)
      cy.get('[data-cy="password-error"]')
        .should('be.visible')
        .and('contain', 'Şifre en az 8 karakter')
      cy.get('[data-cy="submit-button"]').should('be.disabled')
    })

    it('email ve password doğru ama şartlar kabul edilmediğinde', () => {
      cy.get('[data-cy="email-input"]').type(validEmail)
      cy.get('[data-cy="password-input"]').type(validPassword)
      cy.get('[data-cy="submit-button"]').should('be.disabled')
    })
  })
})
