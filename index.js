var express=require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'))

app.get('/',function(req,res){
	// res.send('<h1>iwtofly</h1>');
	res.sendFile(__dirname+'/index.html');
})

app.get('/draw',function(req,res){
	res.sendFile(__dirname+'/main.html')
})

io.on('connection',function(socket){
	console.log("a user connected");

	socket.on('disconnect',function(){
		console.log("user is disconnected");
	})

	//msg为收到的参数，即$('#m').val()
	socket.on('chat message',function(msg){
		console.log('message:'+msg);
		io.emit('chat message',msg);
	});

});

http.listen(3000,function(req,res){
	console.log('listening on *:3000');
})