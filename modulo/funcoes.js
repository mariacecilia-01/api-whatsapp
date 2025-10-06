/************************************************************************************************************
 * Objetivo: Armazenar funções referentes a API do WhatsApp.
 * Data: 24/09/2025
 * Autor: Maria Cecilia
 * Versão: 1.0
**************************************************************************************************************/

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

//Função para retornar um usuário com base no número de telefone.
//Testada: funcionando.
const getUserProfile = function(number){  
        let message = {status: true, status_code:200, developer:'Maria Cecilia Pereira Jardim', profile : []}

            dados.contatos['whats-users'].forEach(function(item){
                if(item.number == number){
                message.profile.push({
                name: item.account,
                nick: item.nickname,
                photo: item['profile-image'],
                number: item.number,
                background_color: item.background,
                created: item['created-since'].start,
                ended: item['created-since'].end
            })
        }
    })

    if(message.profile.length > 0){
        return message
    } else{
        return MESSAGE_ERROR
    }
}

//Função para retornar todos os contatos de um usuário, com base no número de telefone.
//Testada = funcionando
const getUserContact = function(number){
    let message = {status: true, status_code: 200, developer:'Maria Cecilia Pereira Jardim', name: '', contacts : []}
    
    dados.contatos['whats-users'].forEach(function(item){
        if(item.number == number){
            message.name = item.account
            item.contacts.forEach(function(itemContato){
                message.contacts.push({
                    name_contact: itemContato.name,
                    photo: itemContato.image,
                    description: itemContato.description
                })
            })
        }
    })

    if(message.contacts.length > 0){
        return message
    }else{
        return MESSAGE_ERROR
    }
}

//Função para retornar todas as mensagens de um usuário, com base no numero de telefone.
//Testada = funcionando.
const getUserMessages = function(number){
    let message = {status: true, status_code: 200, developer:'Maria Cecilia Pereira Jardim', messages : []}

    dados.contatos['whats-users'].forEach(function(item){
        if(item.number == number){
            item.contacts.forEach(function(itemContato){
                itemContato.messages.forEach(function(itemMensagens){
                    message.messages.push({
                        destinario: itemMensagens.sender,
                        mensagem: itemMensagens.content,
                        horario: itemMensagens.time
                    })
                })
            })
        }
    })

    if(message.messages.length > 0){
        return message
    }else{
        return MESSAGE_ERROR
    }
}

// Função para retornar o chat com apenas um usuário, com base no numero de telefone dos dois
// Testada = funcionando.
const getChatUser = function(numberUser, numberContact){
    let dadosUsuario = dados.contatos['whats-users'].find(usuario => usuario.number == numberUser)
    let dadosContato = dadosUsuario.contacts.find(contato => contato.number == numberContact)

    let message = {status: true, status_code: 200, developer:'Maria Cecilia Pereira Jardim', chat : dadosContato.messages}

    if(message.chat.length > 0){
        return message
    }else{
        return MESSAGE_ERROR
    }
}

//função para buscar as mensagens pela palavra chave.
//Testada = funcionando.
const getKeyword = function(keyword, numberUser, numberContact) {
    let message = {status: true, status_code: 200, developer: 'Maria Cecilia Pereira Jardim', messagesKeyword: []
    }

    dados.contatos['whats-users'].forEach(function(item) {
        if (item.number == numberUser || item.number == numberContact) {
            item.contacts.forEach(function(itemContato) {

                //filtro das mensagens que possui a palavras chave testada
                const mensagensEncontradas = itemContato.messages.filter(mensagem =>
                    mensagem.content.toLowerCase().includes(keyword.toLowerCase())
                );

                // Se achou alguma mensagem, adiciona ao resultado, usando a filtragem feita nas mensagens
                if (mensagensEncontradas.length > 0) {
                    message.messagesKeyword.push({
                        name: item.account,
                        contato: itemContato.name,
                        palavra_chave: keyword,
                        mensagens: mensagensEncontradas
                    });
                }
            });
        }
    });

    if (message.messagesKeyword.length > 0) {
        return message;
    } else {
        return MESSAGE_ERROR;
    }
}


  

console.log(getKeyword('going', '11966578996', '26999999910'))

module.exports = {
    getAllUsers,
    getUserProfile,
    getUserContact,
    getUserMessages,
    getChatUser,
    getKeyword
}