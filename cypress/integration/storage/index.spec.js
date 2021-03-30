/// <reference types="cypress" />

describe("Cold Storage Monitor", () => {
    const mainPage = 'http://10.10.10.19';
    //const mainPage = "http://google.com";
  it("Visits the Main Dashboard", () => {
    cy.viewport(1000, 1000);
    cy.visit(mainPage);
    const date = new Date().toISOString().slice(0, 10);
    cy.screenshot(date);
    const file = `./cypress/screenshots/storage/index.spec.js/${date}.png`;
    console.log(file);
    cy.task('email', { file })
  });
});