//routing

var express = require("express")
var bodyParser = require("body-parser")

var app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(__dirname))

app.set('view engine','pug');
app.set('views','./views')

app.get('/', function (req,res) {
	res.render('index',{title:"Home"})
})

app.get('/about', function (req,res) {
	res.render('index',{title:"about"})
})

app.get('/:text', function (req,res) {
	res.render('index',{title:"Input Test ",text:req.params.text})
})

app.post('/login',function (req,res) {
	res.render('index',{title: "Login", user: {username: req.body.username}})
})

app.listen(3000,function() {
	console.log("Express app running at 127.0.0.1:3000");
})  