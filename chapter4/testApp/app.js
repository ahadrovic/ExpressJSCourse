//creating and configuring middleware


var express = require("express")
var cookieSession = require('cookie-session');

var app = express()

app.use(cookieSession({

	name: 'session',
	keys: ['key1','key2']

}))

app.get('/viewCount',function (req,res,next) {

	req.session.views = ( req.session.views || 0 ) + 1
	res.send('This page has been viewed: ' + req.session.views + ' times')
	
})


app.listen(3000);

