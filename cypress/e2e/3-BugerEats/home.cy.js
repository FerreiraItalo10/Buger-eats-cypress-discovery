describe ('home page', ()=>{

    it('app deve estar online', ()=>{
        //cy.viewport(1440,900) // resolução das imagens, padrão é 1000 por 660
        cy.visit('/') // acessar página solicitada
        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats') // confirma se tem o elemento na página
    }) // caso de teste

}) // Função em javascript