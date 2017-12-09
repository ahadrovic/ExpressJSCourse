var express = require("express");
var app = express();

app.get('/',function(request,response){
	
	response.sendFile( __dirname + "/index.html");

});

app.get('/message',function(request,response){
	
	response.send("hello");

});

app.listen(8081);