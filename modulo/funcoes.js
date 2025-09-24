/************************************************************************************************************
 * Objetivo: Armazenar funções referentes a API do WhatsApp.
 * Data: 24/09/2025
 * Autor: Maria Cecilia
 * Versão: 1.0
**************************************************************************************************************/

const { profile } = require('console')
const dados = require('./contatos.js')

const MESSAGE_ERROR = {status: false, status_code: 500, developer: 'Maria Cecilia Pereira Jardim'}


//Função para retornar todos os usuários do WhatsApp.
//Testada = funcionando.
const getAllUsers = function(){
    let message = {status: true, status_code:200, developer:'Maria Cecilia Pereira Jardim', users_data : []}

    dados.contatos['whats-users'].forEach(function(item){
        message.users_data.push(item)
    })

    message.quantidade = message.users_data.length

    if(message.users_data.length > 0){
        return message
    }else{
        return MESSAGE_ERROR
    }
}

const getUserProfile = function(){
    let dataUser = dados.contatos['whats-users'].find(dados => dados)

    let message = {status: true, status_code:200, developer:'Maria Cecilia Pereira Jardim', profile : dataUser}

    console.log(message)

    if(dataUser){
        return message
    }else{
        return MESSAGE_ERROR
    }
    
}

getUserProfile('11966578996')

module.exports = {
    getAllUsers,
    getUserProfile
}