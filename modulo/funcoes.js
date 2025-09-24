/************************************************************************************************************
 * Objetivo: Armazenar funções referentes a API do WhatsApp.
 * Data: 24/09/2025
 * Autor: Maria Cecilia
 * Versão: 1.0
**************************************************************************************************************/

const dados = require('./contatos.js')

const MESSAGE_ERROR = {status: false, status_code: 500, developer: 'Maria Cecilia Pereira Jardim'}
// const MESSAGE_SUCCESS = {status: true, status_code:200, developer:'Maria Cecilia Pereira Jardim'}

const getAllUsers = function(){
    let message = {status: true, status_code:200, developer:'Maria Cecilia Pereira Jardim', users_data : []}

    dados.contatos['whats-users'].forEach(function(item){
        message.users_data.push(item)
    })

    message.quantidade = message.users_data.length

    console.log(message)

    if(message.users_data.length > 0){
        return message
    }else{
        return MESSAGE_ERROR
    }
}

getAllUsers()

module.exports = {
    getAllUsers
}