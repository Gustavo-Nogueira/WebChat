// Módulos
let express = require("express");
let consign = require("consign");
let bodyParser = require("body-parser");
let expressValidator = require("express-validator");
let mongoose = require("mongoose");
let app = express();

// Definindo ejs como engine de views
app.set("view engine","ejs");
// Definindo o diretório das views
app.set("views","./app/views");

// Conexão com banco
const name_bd = 'chat_websocket';
const url = `mongodb://localhost:27017/${name_bd}`
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
		.then(function(){
			console.log("Sucesso na conexão com BD.");
		})
		.catch(function(err){
			console.log("Falha na conexão com BD:",err);
		});

// Middlewares

// Definindo diretório dos arquivos estáticos(assets)
app.use(express.static("./app/public"));

// Body-parse: preenche a propriedade req.body de acordo com Content-Type
// Configuração do middleware do body-parser: suporte para o formato urlencoded.
app.use(bodyParser.urlencoded({extended:true}));

// Efetuando o autoload das rotas,controllers e models para o obj app
consign()
	.include("./app/routes")
	.then("./app/models")
	.then("./app/controllers")
	.into(app);

module.exports = app;