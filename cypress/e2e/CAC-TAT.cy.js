


describe('Central de Atendimento ao cliente TAT', () => {
  beforeEach(()=>{
    cy.visit('src/index.html')
  
  })
  it('Verifica o título da aplicação', () => {   
    cy.title().should('eq','Central de Atendimento ao Cliente TAT')
  })
  it('Preenche os campos obrigatórios e envia o formulário',()=>{
    cy.fillMandatoryFieldsAndSubmitFixedData()
    cy.get('.success').should('be.visible')

  })
  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',()=>{
    cy.fillMandatoryFieldsAndSubmit('Clara', 'Maria','clara.maria.email','Obrigada, foi tudo muito útil!')
    cy.get('.error').should('be.visible')

  })
  it('Campo telefone fica vazio quando  recebe valores não numéricos',()=>{
    cy.get('#phone').type("Aphanumerico567").should('have.value','')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',()=>{
    cy.fillMandatoryFieldsAndSubmitWithPhoneNumber('Clara','Lua','clara.lua@email.com',' ','Obrigada')
    cy.get('.error').should('be.visible')
  })
  it('Preenche e limpa os campos nome, sobrenome,email e telefone',()=>{
    cy.get('#firstName').type("Alana").should('have.value','Alana').clear().should('have.value','')
    cy.get('#lastName').type("Silva").should('have.value','Silva').clear().should('have.value','')
    cy.get('#email').type('alana.silva@email.com').should('have.value','alana.silva@email.com').clear().should('have.value','')  
    cy.get('#phone').type('11999999999').should('have.value','11999999999').clear().should('have.value','')
  })
  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',()=>{
    cy.get('.button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })
  it('Envia o formulário com sucesso usando um comando customizado enviando dados como parâmetro',()=>{
    cy.fillMandatoryFieldsAndSubmit('Dana','Maria','dana.maria@email.com','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    cy.get('.success').should('be.visible')

  })
  it('Envia o formulário com sucesso usando um comando customizado enviando um objeto como parâmetro',()=>{
    const data = {
      firstName: 'Paula',
      lastName:'Duarte',
      email:'paula.duarte@gmail.com',
      text:'textos e mais textos'
    }
    cy.fillMandatoryFieldsAndSubmitObject(data)
    cy.get('.success').should('be.visible')

  })
  it('Envia o formulário com sucesso usando um comando customizado, mas sem enviar o objeto para usar o objeto exsitente no custom command',()=>{
    cy.fillMandatoryFieldsAndSubmitObject()
    cy.get('.success').should('be.visible')
  })
  it('seleciona um produto (YouTube) por seu texto',()=>{
    cy.get('#product').select('YouTube').should('have.value','youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)',()=>{
    cy.get('#product').select('mentoria').should('have.value','mentoria')
  })
  it('seleciona um produto(Blog) por seu índice',()=>{
    cy.get('#product').select(1).should('have.value','blog')
  })
  it('marca o tipo de atendimento "Feedback"',()=>{
    cy.get('input[type="radio"]').check('feedback').should('be.checked')
  })
  it('marca cada tipo de atendimento',()=>{
    cy.get('input[type="radio"]').each((typeOfService)=>{
      cy.wrap(typeOfService).check().should('be.checked')

    })

  })
  it('Marca ambos checkboxes, depois desmarca o último',()=>{
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')

  })
  it('Seleciona um arquivo da pasta fixtures',()=>{
    cy.get('#file-upload')
     .selectFile('cypress/fixtures/example.json')
     .should(input=>{
        expect(input[0].files[0].name).to.equal('example.json')
     })
  })


  it('Seleciona um arquivo simulando um drag and drop',()=>{
    cy.get('#file-upload')
     .selectFile('cypress/fixtures/example.json',{action:'drag-drop'})
      .then(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',()=>{
    cy.fixture('example.json',{encoding:null}).as('exampleFile')
    cy.get('#file-upload')
     .selectFile('@exampleFile')
     .then(input=>{
        expect(input[0].files[0].name).to.equal('example.json')
     })
  })
  it.skip('Verifica que a política de privacidade está desmarcada',()=>{
    cy.contains('a','Política de Privacidade')
     .should('have.attr','target','_blank')
     .and('have.attr','href','privacy.html')
  })
  it.skip('Acessa a página da política de privacidade removendo o target e então clicando no link',()=>{
    cy.contains('a','Política de Privacidade').invoke('removeAttr','target').click()
    cy.origin('src/privacy.html')
    cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')
  })

  it('Testa a página da política de privacidade de forma independente',()=>{
    cy.contains('Política de Privacidade').invoke('removeAttr','target').click()
    cy.title().should('eq','Central de Atendimento ao Cliente TAT - Política de Privacidade')
  })
})


