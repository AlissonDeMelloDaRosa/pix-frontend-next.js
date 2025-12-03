/* eslint-disable @typescript-eslint/no-namespace */
Cypress.Commands.add('login', (cpfCnpj: string, senha: string) => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/');
  cy.get('input#cpf_cnpj').type(cpfCnpj);
  cy.get('input#senha').type(senha);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('loginWithMock', () => {
  cy.intercept('POST', '**/auth/login', {
    statusCode: 200,
    body: { token: 'mock-jwt-token' },
  }).as('loginRequest');

  cy.intercept('GET', '**/auth/me', {
    statusCode: 200,
    body: { id: 1, nome: 'Usuário Teste', cpf_cnpj: '12345678900' },
  }).as('getMeRequest');

  cy.visit('/');
  cy.get('input#cpf_cnpj').type('12345678900');
  cy.get('input#senha').type('senha123');
  cy.get('button[type="submit"]').click();
  cy.wait('@loginRequest');
  cy.url().should('include', '/dashboard');
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(cpfCnpj: string, senha: string): Chainable<void>;
      loginWithMock(): Chainable<void>;
    }
  }
}

export {};
