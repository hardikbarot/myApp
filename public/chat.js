var from='';
var to='';
var socket;
window.onload = function() {

	//var messages = [];
	socket = io.connect('http://192.168.1.104:3700');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");
	var acontent = document.getElementById("acontent");
	var toname = document.getElementById("to");
	var activeuser = document.getElementById("activeuser");
	
	var conttentto;

	socket.on('fromto', function (data) {
	from=data.from;
	to=data.to;	
	});
	
	socket.on('activeusers', function (data) {
	var pname=from;
var html='Active Users </br>';
for(i=0;i<data.activeusers.length;i++)
{
debugger;
if(data.activeusers[i]!=from){
html+='<b> => <a href="#" id="'+data.activeusers+'" onclick="openChat(\''+data.activeusers[i]+'\')">'+data.activeusers[i]+'</b></br>';
}
}
activeuser.innerHTML = html;
});

socket.on('sentMessage',function (data) {
var line1='';
console.log("sender:-"+data.msg.s1+",Reciever:-"+data.msg.r1+",Message:-"+data.msg.m1);
debugger;
if(data.msg.r1==from){
openChat(data.msg.s1);
var chat_window_message_ = document.getElementById('chat_window_message_'+data.msg.s1);
line1+='<b>'+data.msg.s1+' to '+data.msg.r1+':</b> '+data.msg.m1+'<br>';
chat_window_message_.innerHTML = chat_window_message_.innerHTML+line1;
allMsg.innerHTML = allMsg.innerHTML+line1;
}
});

	/*
	socket.on('message', function (data) {

		if(data.message) {
		
			var line1='<div id="content_'+to+'" style="height:100px">';
		if(document.getElementById("content_"+to)==null){
			acontent.innerHTML =acontent.innerHTML+ line1;
			}
		
			 conttentto=document.getElementById("content_"+to);
			var html = '';
			html += '<b> From' + (data.username ? data.username : 'Server') + '-To: '+data.to+'</b>';
				html += data.message + '<br />';
				debugger;
				//if(name==data.to){
			conttentto.innerHTML = conttentto.innerHTML+html;
			//}
		}
	});
	
	

	sendButton.onclick = sendMessage = function() {
	to=toname.value;
		if(name.value == "") {
			alert("Please type your name!");
		} else {
			var text = field.value;
			debugger;
			socket.emit('send', { message: text, username: from,'to':to});
			field.value = "";
		}
	};
	*/
	
}

function openChat(userName){

if(document.getElementById('chat_window_'+userName)==null){

var chatWindow = '';
var chatWindowHeight = '150px' ;
var line1='<div id="chat_window_'+userName+'"  style="border-spacing: initial;border: solid;height: 98%;float: left;margin-right: 10px;width: 23%;">';
var line2='<div id="chat_window_title_'+userName+'" >'+userName+'</div>';
var line3='<div id="chat_window_message_'+userName+'" style="height: 75%;float: left;margin-right: 10px;width: 100%;overflow-y: scroll;"></div>';
var line4='<div id="chat_window_message_input_'+userName+'">';
var line5='<input type="text" name="message" id="chat_message_'+userName+'" /><br>';
var line6='<input type="button" name="message" id="chat_send_'+userName+'" onclick="sendMessageToFriend(\''+userName+'\')" value="Send"/>';
var line7='</div></div>';

chatWindow=line1+line2+line3+line4+line5+line6+line7;
var chatdiv1 = document.getElementById("acontent");
chatdiv1.innerHTML = chatdiv1.innerHTML + chatWindow;

}
}

function sendMessageToFriend(userName){
var chat_window_message_ = document.getElementById('chat_window_message_'+userName);
var chat_message_= document.getElementById('chat_message_'+userName);
var message = document.getElementById('chat_message_'+userName).value;
socket.emit('sending', {'m1': message, 'r1': userName,'s1':from});
var line1='<b>Me :</b> '+message+'<br>';
chat_window_message_.innerHTML = chat_window_message_.innerHTML+line1;
chat_message_.value='';
}

window.onbeforeunload = function(e){
socket.emit('DeactiveuserName', {'username': from});
var msg = 'Are you sure? :-' +from;

e = e || window.event;

if(e)
e.returnValue = msg;

return msg;
}
