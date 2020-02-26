const { check, validationResult } = require('express-validator');

module.exports.initChat = function(application,req,res){
	const dataForm = req.body;

	const errors = validationResult(req);
	if(!errors.isEmpty()){
		console.log(errors);
		res.render("index", {validation: errors.array()});
		return;
	}

	res.render("chat",{data: dataForm});
};

module.exports.validations = function(){
	return [
		check('nickname').notEmpty()
					     .withMessage('Nickname está vazio.'),
		check('nickname').isLength({ min: 3, max: 15 })
						 .withMessage('Nickname deve conter entre 5 e 15 caracteres.')
	];
};

// Rotinas para definir os Eventos gerenciados pelo socket

module.exports.onDisconnect = function(socket,UserModel){
	// acionado quando o usuário desconecta do socket
	socket.on('disconnect',function(){
		UserModel.deleteOne({userSocketId: socket.id},function(err){
			if(err) console.log("Falha ao remover do bd: ",err);
			else console.log("Sucesso ao remover do bd.");
		});
		
		// Update dos participantes online no chat pela aba "Participantes"
		// retorna somente para usuário que saiu.
		socket.emit('update_online_participants',{userSocketId: socket.id,logged: false});
		// broadcast para os outros usuários conectados no socket.
		socket.broadcast.emit('update_online_participants',{userSocketId: socket.id,logged: false});

		console.log("Usuário desconenctou. Socket ID:",socket.id);
	});	
};

module.exports.newMsgChat = function(socket){
	// gerencia trocas de mensagens
	socket.on('send_msg_server',function(data){
		// retorna somente para usuário que enviou.
		socket.emit('send_msg_client',data);
		// broadcast para os outros usuários conectados no socket.
		socket.broadcast.emit('send_msg_client',data);
	});
};

module.exports.newParticipantChat = function(socket,UserModel){
	console.log("Usuário conenctou. Socket ID:",socket.id);
	const nick = socket.handshake.query['nickname']; // recuperando nick enviado para conexão

	// criando novo registro de user
	const new_user = new UserModel({nickname: nick,userSocketId: socket.id});
		
	// salvando novo registro no bd
	new_user.save()
			.then(function(){ console.log("Sucesso ao salvar no bd."); })	
			.catch(function(err){ console.log("Falha ao salvar no bd: ",err); });

	// Emit broadcast para criar caixa de diálogo que informa que entrou um novo participante.
	socket.broadcast.emit('send_msg_client',{nickname: nick, msg: " entrou no chat!"})

	// Update dos participantes online no chat pela aba "Participantes"
	UserModel.find({},function(err,users){
		// retorna somente para usuário que entrou.
		socket.emit('update_online_participants',
					{updateUsers: [...users,{userSocketId: socket.id,nickname: nick}],logged: true});
		// broadcast para os outros usuários conectados no socket.
		socket.broadcast.emit('update_online_participants',
					{updateUsers: [{userSocketId: socket.id,nickname: nick}],logged: true});
	});
};
