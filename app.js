/************************************************************************************************************
 * Objetivo: Armazenar endPoints referentes a API do WhatsApp.
 * Data: 24/09/2025
 * Autor: Maria Cecilia
 * Versão: 1.0
 * 
 * Observações: Instalações do Express, Cors, Body-Parser
 * npm install express --save
 * npm install cors express --save
 * npm install body-parser --save 
**************************************************************************************************************/

//import das dependências da API
const express = require('express') //responsável pela API
const cors = require('cors') //responsável pelas permissões da API (APP)
const bodyParser = require('body-parser') //responsável por gerenciar a chegada dos dados da APi com o frontend

//import do arquivo de funções
const dados = require('./modulo/funcoes.js')

const PORT = process.env.PORT|| 8080

const app = express()

app.use((request, response, next) => { 
    response.header('Access-Control-Allow-Origin', '*') //Servidor de origem da API
    response.header('Access-Control-Allow-Methods', 'GET') //Verbos permitidos na API -> Asterisco não funciona aqui, devemos escrever anualmente todos os verbos permitiremos
    //carrega as configurações no CORS da API
    app.use(cors())
    next()//Próximo, carregar os proximos endpoints
})

//ENDPOINTS

//testada no postman
app.get('/v1/whats-users', function(request, response){
    let users = dados.getAllUsers()

    return response.status(users.status_code).json(users)
})

//testada no postman
app.get('/v1/user-profile/:number', function(request, response){
    let userNumber = request.params.number

    let user = dados.getUserProfile(userNumber)

    return response.status(user.status_code).json(user)
})

//testada no postman
app.get('/v1/user-contacts', function(request, response) {
    const userNumber = request.query.number
    const contatoUser = dados.getUserContact(userNumber)

    return response.status(contatoUser.status_code).json(contatoUser)
})

//testada no postman
app.get('/v1/user-messages', function(request, response) {
    const userNumber = request.query.number

    const mensagensUser = dados.getUserMessages(userNumber)

    response.status(mensagensUser.status_code)
    response.json(mensagensUser)
})

//testada no postman
app.get('/v1/chat', function(request, response) {
    const numberUser = request.query.numberUser
    const numberContact = request.query.numberContact

    const chatUser = dados.getChatUser(numberUser, numberContact)

    return response.status(chatUser.status_code).json(chatUser)
})

//testada no postman
app.get('/v1/messages/search', function(request, response) {
    const keyword = request.query.keyword
    const numberUser = request.query.numberUser
    const numberContact = request.query.numberContact

    const palavraChave = dados.getKeyword(keyword, numberUser, numberContact)

    return response.status(palavraChave.status_code).json(palavraChave)
})

app.listen(PORT, function(){
    console.log('API aguardando por requisições!')
})


