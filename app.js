const application = require("./config/server");
const controllersChat = application.app.controllers.chat;

// Recuperando a model que instanciará novos participantes
const UserModel = application.app.models.users;

let server = application.listen(80,function(){
	console.log("Servidor ON");
});

// Config para executar o socket.io na mesma instância servidora da aplicação, assim agindo na mesma uri e porta da aplicação
let io = require("socket.io").listen(server);

// Definindo,com express, a instância do Socket.io como variável global da aplicação
application.set('io',io);  

// Removendo docs que já estão pré-inseridos no bd
UserModel.deleteMany({},function(err){
	if(err) { console.log("Erro durante query no bd: ",err); return; }
});

// O evento 'connection' é acionado após uma conexão bem-sucedida do navegador da web com o servidor
io.on('connection',function(socket){
	controllersChat.newParticipantChat(socket,UserModel);
	
	// Eventos
	controllersChat.onDisconnect(socket,UserModel);
	controllersChat.newMsgChat(socket);
});

