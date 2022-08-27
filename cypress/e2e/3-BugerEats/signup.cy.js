import signup from '../../pages/SignupPage'
import signupFactory from '../../factories/SignupFactory'



describe('Signup', ()=>{

    // exemplo de gancho no cypress

    before( ()=>{
        cy.log('Tudo aqui é executado uma única vez ANTES DE TODOS os casos de testes')
    })

    // Esse gancho está usando a massa de teste que se encontra na pasta fixture no arquivo deliver.json

    beforeEach( function(){
        cy.log('Tudo aqui é executado sempre ANTES DE CADA caso de testes')
        cy.fixture('deliver').then((d)=>{
            this.deliver = d
        })
    })

    after( ()=>{
        cy.log('Tudo aqui é executado uma única vez DEPOIS DE TODOS os casos de testes')
    })

    afterEach( ()=>{
        cy.log('Tudo aqui é executado sempre DEPOIS DE CADA caso de testes')
    })

    // Primeiro caso de teste descrito através do it

    it('User should be deliver', ()=> {

        // criar massa de teste a partir da pasta factories e arquivo SignupFactory.js

        var deliver = signupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = "Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato." 
        signup.modalContentShouldBe(expectedMessage)
    })

    // Segundo caso de teste descrito através do it

    it('Incorrect document',()=> {

        var deliver = signupFactory.deliver()

        deliver.cpf = '000000141AA'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.errorMessage('Oops! CPF inválido')    
    })

    // Terceiro caso de teste descrito através do it

    it('Incorrect email',function(){

        var deliver = signupFactory.deliver()

        deliver.email = 'bruna.maria.gmail.com'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.errorMessage('Oops! Email com formato inválido.')   
    })

    // Terceiro caso de teste descrito através do context para caso ocorra erro em uma etapa o teste seguirá até o fim

    context('Required fields', ()=>{

        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o e-mail'},
            {field: 'postalcode', output: 'É necessário informar o CEP'},
            {field: 'number', output: 'É necessário informar o número do endereço'},
            {field: 'delivery_method', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ]

        before('Required fields', ()=> {
            signup.go()
            signup.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signup.errorMessage(msg.output)
            })
        })
    })

})