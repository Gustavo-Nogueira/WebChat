<h1 align="center">Socket, WebSocket e Socket.IO </h1>

## Socket
	
Um socket é um *endpoint* de um link de comunicação bidirecional entre dois processos diferentes que podem ou não estar na mesma máquina, assim permitindo a comunicação entre esses processos.

Os sockets são um conceito mais genérico, ou seja, não ficam restritos somente ao protocolo HTTP(voltado para aplicações web), assim sendo, os sockets também podem ser utilizados em aplicações que utilizam outros tipos protocolos na camada de aplicação, tais como os protocolos FTP, SMTP e POP3. 

* Um exemplo de utilização é quando fazemos um ssh em um servidor estamos abrindo e utilizando um socket. 
* Um outro exemplo são os chats.

### Tipos de sockets

No geral existem dois tipos de sockets: TCP e UDP(protocolos da camada de transporte). Os dois tipo são controlados pela API de sockets de maneira a abstrair detalhes da rede para o desenvolvedor.[3]

Os sockets do tipo TCP são orientados a conexão e tem um canal exclusivo de comunicação entre cliente e servidor. Eles garantem a ordem dos pacotes, são considerados confiáveis e sem perda.[3]

Já os sockets do tipo UDP desconsidera ordem de pacotes, recuperação de falhas e garantia de ordem. No entanto, por ser extremamente menos burocrático e simples, ele é mais rápido que o TCP para alguns tipos de aplicações.[3]

<p align="center">
	<img src="https://dkrn4sk0rn31v.cloudfront.net/2019/05/31211650/socket-transport-application.png"/>
	<a href="https://www.treinaweb.com.br/blog/uma-introducao-a-tcp-udp-e-sockets/">Link da imagem</a>
</p>

## WebSocket
	 
É um protocolo de comunicação, aplicado geralmente a aplicações web, que fornece/gerencia comunicação assíncrona e bidirecional entre o client-server através de uma conexão TCP. 

O websocket é executado pelo navegador e servidor web, usa o protocolo HTTP e ambos interlocutores trocam mensagens simultaneamente, o que é chamado de *full-duplex*. Além disso, o WebSocket permanece aberto o tempo todo, permitindo a transferência de dados em tempo real.

## Socket.IO 
	
É uma biblioteca que permite a comunicação em tempo real e *full-duplex* entre o Cliente e os servidores da Web. Ele utiliza principalmente o protocolo WebSocket(ou outros, então vide [4] e [5]) para fornecer uma interface que vai proporcionar um desevolvimento de scripts de uma maneira mais simples para que tal comunicação ocorra.

Pelo fato do Socket.IO possuir diversos recursos, como transmissão para vários soquetes(aplicando o conceito de *broadcast*) e outros(vide [4] e [5]), então ele acaba sendo mais do que uma simples camada sobre WebSockets.

**Obs.:**
* Requer que ambas as bibliotecas sejam usadas no lado do cliente e também uma biblioteca do lado do servidor.

### Funcionamento da biblioteca Socket.IO

Basicamente a comunicação *client-server* é definida a partir de dois métodos, .on e .emit , que vão que são reponsáveis por tratar eventos que quando acionados executam alguma rotina *callback*.

* on('evento',callback): Ouvindo pedidos de execução. 
* emit('evento',(objeto,string,callback,etc)): Pedido para executar alguma ação.

Sempre que um novo client "x" se conecta com o servidor é instanciado um socket_client para esse client, então a partir desse socket_client é possível realizar a comunicação entre client "x" e os demais clients conectados ao servidor. O fluxo abaixo demonstra as etapas que ocorrem no processo de comunicação para enviar uma mensagem(p. ex.), broadcast neste caso:

1) O client "x" envia uma requisição, utilizando o seu socket do frontend, com uma mensagem para um evento "y" que será escutado pelo servidor;

2) O socket do client "x"(que estão no backend) então detecta(.on()) que o evento "y" foi acionado e então executa o *callback* designado para o evento "y";

3) Em seguida, por se tratar de um *broadcast*, o *callback* em questão envia(.emit()) essa mensagem do client "x" utilizando um evento "z" para os sockets(que estão no frontend) dos outros clients que estão conentados ao servidor;

4) Por fim, os sockets dos clients (que estão no frontend) irão detectar(.on()) que um evento "z" foi acionado e então executarão o *callback* definido para esse evento seguindo o mesmo raciocíono adotado no passo 2).

#### Código de demonstração

O código abaixo demonstra a utilização da biblioteca no lado do servidor.

<pre>
io.on ( 'connection' , function( socket_client ) { 
   // emite um evento somente para o socket(no frontend) do client que acionou o evento 'connection'
   socket_client.emit ( 'nome_evento_escutado_pelo_client' , / * * / ); 
   
   // emite um evento para todos os soquetes conectados
   io.emit ( 'nome_evento_escutado_pelo_client' , / * * / ); 
   
   // emite um evento para todos os soquetes conectados(é equilante ao da linha acima)
   socket_client.broadcast.emit ( 'nome_evento_escutado_pelo_client' , / * * / ); 
   
   // ouça o evento e execute determinado *callback* quando acionado
   socket_client.on ( 'nome_evento_escutado_pelo_server' , function (){ / * * / }); 
});
</pre> 

#### Eventos internos do Socket.IO

* Connection: O evento 'connection' é acionado após uma conexão bem-sucedida do navegador da web com o servidor;
* Disconnect: O evento 'disconnect' é acionado após o client disconectar-se do servidor.

## Arquivos importantes quanto a utilização do Socket.IO nesse projeto

* [app.js](https://github.com/Gustavo-Nogueira/WebChat/blob/master/app.js): Demonstra a utilização da biblioteca no lado do servidor. Nesse arquivo está definido as tratativas tomadas quando o evento 'connection' for acionado.

* [chat.js - Controller](https://github.com/Gustavo-Nogueira/WebChat/blob/master/app/controllers/chat.js): Demonstra a utilização da biblioteca no lado do servidor. Possui os eventos que serão ouvidos pelos sockets dos clients que estão no lado do servidor, bem como o *callback* designado quando tais eventos ocorrerem.

* [chat.ejs - View](https://github.com/Gustavo-Nogueira/WebChat/blob/master/app/views/chat.ejs): Demonstra a utilização da biblioteca no lado do cliente. Possui os eventos que serão ouvidos pelos sockets dos clients que estão no lado do cliente, bem como o *callback* designado quando tais eventos ocorrerem.



## Referências:
**Principais:**
* [1] **https://www.educba.com/websocket-vs-socket-io/**
* [2] https://en.wikipedia.org/wiki/Socket.IO
* [3] https://blog.pantuza.com/artigos/o-que-sao-e-como-funcionam-os-sockets
* [4] https://davidwalsh.name/websocket
* [5] https://socket.io/docs/

**Outras:**
* https://stackoverflow.com/questions/4973622/difference-between-socket-and-websocket
* https://stackoverflow.com/questions/10112178/differences-between-socket-io-and-websockets
