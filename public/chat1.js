window.onload = function() {
var name = document.getElementById("name");
var senduserNameButton = document.getElementById("senduserName");
senduserNameButton.onclick = senduserName = function() {
		if(name.value == "") {
			alert("Please type your name!");
		} else {
			
			window.location = "http://192.168.1.104:3700/chat?uname="+name.value;
			
		}
	};

}
