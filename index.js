var express = require("express");
var app = express();
var port = 3700;
var mongojs = require('mongojs');
var db = mongojs('test', ['chatting']);

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){

   var IP1 =req.header('x-forwarded-for') || req.connection.remoteAddress;
   console.log("IP adress IP1 is:- "+IP1);
	res.render("page");
});

var io = require('socket.io').listen(app.listen(3700));
var msg;
io.sockets.on('connection', function (socket) {
	socket.emit('message', { message: 'welcome to the chat' });
	socket.on('send', function (data) {
	io.sockets.emit('message', data);
	});
});
console.log("Listening on port 3700" );
