// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit',(firstName,lastName,email,text)=>{
    cy.get('#firstName').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)  
    cy.get('#product').select('Mentoria')
    cy.get('#support-type > :nth-child(2)').click()
    cy.get('[for="email-checkbox"]').click()
    cy.get('#open-text-area').type(text,{delay:0})
    cy.contains('Enviar').click()
    
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitFixedData',()=>{
    const longText = Cypress._.repeat('Lorem ipsum dolor sit amet, consectetur adipiscing elit.',20)
    cy.get('#firstName').type('Daniela')
    cy.get('#lastName').type('Dantas')
    cy.get('#email').type('daniela.dantas@email.com')  
    cy.get('#product').select('Blog')
    cy.get('#support-type > :nth-child(3)').click()
    cy.get('[for="email-checkbox"]').click()
    cy.get('#open-text-area').type(longText,{delay:0})
    cy.get('.button[type="submit"]').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithPhoneNumber',(firstName,lastName,email,phoneNumber,text)=>{  
    cy.get('#firstName').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)  
    cy.get('#phone').type(phoneNumber)
    cy.get('#product').select('Mentoria')
    cy.get('#support-type > :nth-child(2)').click()  
    cy.get('#open-text-area').type(text,{delay:0})
    cy.get('input[type="checkbox"]').check('phone')
    cy.contains('button','Enviar').click()
    
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitObject',(data={
    firstName:'John',
    lastName:'Doe',
    email:'john.doe@email.com',
    text:'test.'

}) =>{
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)  
    cy.get('#product').select('Blog')
    cy.get('#support-type > :nth-child(3)').click()
    cy.get('[for="email-checkbox"]').click()
    cy.get('#open-text-area').type(data.text)
    cy.get('.button[type="submit"]').click()
})



  