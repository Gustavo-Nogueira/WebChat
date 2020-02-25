const validations = require("../controllers/chat").validations();

module.exports = function(application){
	application.post("/chat",validations,function(req,res){
		application.app.controllers.chat.initChat(application,req,res);
	});

	application.get("/chat",function(req,res){
		application.app.controllers.chat.initChat(application,req,res);
	});
};