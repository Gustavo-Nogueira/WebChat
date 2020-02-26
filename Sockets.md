
## Socket
	
	Um socket é um endpoint de um link de comunicação bidirecional entre dois processos diferentes que podem ou não estar na mesma máquina, assim permitindo a comunicação entre esses processos.
	
	Os sockets são um conceito mais genérico, ou seja, não ficam restritos somente ao protocolo HTTP(voltado para aplicações web), assim sendo, os sockets também podem ser utilizados em outros protocolos da camada de aplicação, tais como os protocolos FTP, SMTP e POP3. 

	* Um exemplo de utilização é quando fazemos um ssh em um servidor estamos abrindo e utilizando um socket.  

### Tipos de sockets

	No geral existem dois tipos de sockets: TCP e UDP(protocolos da camada de transporte). Os dois tipo são controlados pela API de sockets de maneira a abstrair detalhes da rede para o desenvolvedor.[3]

	Os sockets do tipo TCP são orientados a conexão e tem um canal exclusivo de comunicação entre cliente e servidor. Eles garantem a ordem dos pacotes, são considerados confiáveis e sem perda.[3]

	Já os sockets do tipo UDP desconsidera ordem de pacotes, recuperação de falhas e garantia de ordem. No entanto, por ser extremamente menos burocrático e simples, ele é mais rápido que o TCP para alguns tipos de aplicações.[3]

	
## WebSocket
	 
	É um protocolo de comunicação, aplicado geralmente a aplicações web, que fornece/gerencia comunicação assíncrona e bidirecional entre o client-server através de uma conexão TCP. 

	O websocket é executado pelo navegador, usa o protocolo HTTP e ambos interlocutores trocam mensagens simultaneamente, o que é chamado de full-duplex. Além disso, o WebSocket permanece aberto o tempo todo, permitindo a transferência de dados em tempo real.

## Socket.IO 
	
	É uma biblioteca que permite a comunicação em tempo real e full-duplex entre o Cliente e os servidores da Web. Ele utiliza principalmente o protocolo WebSocket(ou outros, então vide [3]) para fornecer uma interface. 

	Pelo fato do Socket.IO possuir diversos recursos, como transmissão para vários soquetes(aplicando o conceito de broadcast), então ele acaba sendo mais do que uma camada sobre WebSockets.

	** Obs.: **
		* Requer que ambas as bibliotecas sejam usadas no lado do cliente e também uma biblioteca do lado do servidor.


### Métodos da instância do Socket.IO da aplicação
	on('evento',callback) => Ouvindo pedidos de execução. 
	emit('evento',(objeto,string,callback,etc)) => Pedido para executar alguma ação.


### Criando conexão por WebSocket

	* io.on('connect', callback(socket))
		* "socket" é a instância da conexão por websocket de um usuário.
	* O evento 'connection' é acionado quando algum cliente tenta estabelecer
	 uma conexão,por websocket, com o servidor.
    * O callback é utilizado após o evento conexão ser estabelecida.

### Eventos internos do Socket.IO

* Connect: 
* Disconnect: 

## Referências:
** Principais:
* [1] **https://www.educba.com/websocket-vs-socket-io/**
* [2] https://en.wikipedia.org/wiki/Socket.IO
* [3] https://blog.pantuza.com/artigos/o-que-sao-e-como-funcionam-os-sockets
* [4] https://davidwalsh.name/websocket

** Outras:
https://stackoverflow.com/questions/4973622/difference-between-socket-and-websocket
https://stackoverflow.com/questions/10112178/differences-between-socket-io-and-websockets