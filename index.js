var express = require("express");
var app = express();
var port = 3700;
//var mongojs = require('mongojs');
//var db = mongojs('test', ['chatting','user']);
var url = require('url');
var from='';
var activeUsers=new Array();
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){

   var IP1 =req.header('x-forwarded-for') || req.connection.remoteAddress;
   console.log("IP adress IP1 is:- "+IP1);
	res.render("login");
});
app.get("/chat", function(req, res){
	 var queryData = url.parse(req.url, true).query;
	 from=queryData.uname;
//	 db.user.update({'username':from}, {$set:{'status':'active'}});
	 var IP1 =req.header('x-forwarded-for') || req.connection.remoteAddress;
   console.log("IP adress IP1 is:- "+IP1);
	res.render("page");
});
var io = require('socket.io').listen(app.listen(3700));
var msg;
io.sockets.on('connection', function (socket) {
	activeUsers.push(from);
	
	socket.emit('fromto', { 'from':from});
	 console.log("User is"+from);
	io.sockets.emit('activeusers', {'activeusers':activeUsers});
	
	socket.emit('message', { message: 'welcome to the chat'});
	
	socket.on('sending', function (data) {
	io.sockets.emit('sentMessage', {'msg':data});
	});
	
	
socket.on('DeactiveuserName', function (data) {
//	db.user.update({'username':data.username}, {$set:{'status':'deactive'}});
	activeUsers.pop(data.username);
	io.sockets.emit('message', data);
	});
console.log("Listening on port 3700" );
	
});


