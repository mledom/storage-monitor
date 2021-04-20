/// <reference types="cypress" />

describe('Cold Storage Monitor', () => {
    const mainPage = 'http://10.10.10.19';
    //const mainPage = "http://google.com";
    it('Visits the Main Dashboard', () => {
        cy.viewport(1000, 1000);
        cy.visit(mainPage);
        cy.wait(2000);
        cy.contains('Sensaphone Web600');
        const content = cy.get('#stable td.info').should(($p) => {
            expect($p).to.have.length.of.at.most(1);
            return $p;
        });
        const date = new Date().toISOString().slice(0, 10);
        cy.screenshot(date);
        const file = `./cypress/screenshots/storage/index.spec.js/${date}.png`;
        console.log(file);
        cy.task('email', { file });
    });
});
