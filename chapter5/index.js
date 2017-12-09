
// mulitpart/form

var express = require("express");
var fs = require("fs");
var multer  = require('multer');
var upload = multer({ dest: 'uploads/'});
var bodyParser = require("body-parser");
var cookieSession = require("cookie-session");
var bcrypt = require("bcrypt");
var mongoose = require("mongoose");

var app = express();

var userSchema = mongoose.Schema({
	username: String,
	password: String,
	firstname: String,
	lastname: String,
	email: String
})

//mongoose.connect('mongodb://localhost/chapter6db')



var User = mongoose.model("User",userSchema)

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieSession({
	name: 'session',
	keys: ['key1','key2'],
	maxAge: 60*60*1000,
	secure: true	
	
}))



var uploadImage = upload.single('avatar'); 
var uploadBatch = upload.array('photos',8); 
var uploadAlbum = upload.fields([{name:'avatar',maxCount:1},{name:'photos',maxCount:8}])


app.set('view engine', 'pug');
app.set('views', './views');


//render login
app.get('/login', function (req,res) {

	if (req.session.user) {

		var sessionUser = req.session.user;
		res.render('home',{ user: {username: sessionUser.username, firstname: sessionUser.firstname, 
		lastname: sessionUser.lastname, email: sessionUser.email}});

	}

	res.render('login',{message:"Welcome!"});

});

app.post('/login', function (req,res) {

	req.session.user = null;

	if (!req.body.username || !req.body.password) {
		res.render('login',{message: "Enter both username and password!"})
	}
	else{
		User.findOne({username: req.body.username},function(err,user){

			if (!user.username) {

				res.render('login',{message: "Invalid credentials!"})
			}

			bcrypt.compare(req.body.password,user.password,function (err,response) {
				if (response == true) {
					req.session.user = user;
					res.redirect('/home');
				}
				else{
					res.render('login',{message: "Invalid credentials!"})
				}
			})

			
		})
	}
});

app.get('/session', function (req,res) {
	res.send(req.session)
})

app.post('/logout',function (req,res) {
	delete req.session.user;
	res.render('login',{message: "Logged out"});
})

app.get('/register', function (req,res) {
	res.render('signup',{message: "Sign up"})

});

app.post('/register', function (req,res) {
	
	var form = req.body;

	if (!form.username || !form.password || !form.email) {
		res.render('signup',{message:"Invalid form input. Did you forget to input something?"})
	}
	if (form.password != form.confpassword) {
		res.render('signup',{message:"Passwords do not match!"})
	}
	else{

			User.findOne({username:form.username},function(err,user) {
			
			if (user) {
				res.render('signup',{message:"User already exists"})
			}

			else{

				bcrypt.hash(form.password,10,function (err,hash) {
				
					var newUser = new User(
					{
						username: form.username, 
						password: hash, 
						firstname: form.firstname,
						lastname:form.lastname, 
						email:form.email}
	
					)

					newUser.save(function (argument) {
						if (err) {
							res.send("Something went wrong!")
						}
						else{
							res.redirect('/login');
						}
					})
				
		
				})
			
			}
			
		})
				
	}

});


app.get('/home', function (req,res) {

	if (!req.session.user) {
		res.render('login',{message: "Access Denied!"})
	}

	var sessionUser = req.session.user;
	res.render('home',{ user: {username: sessionUser.username, firstname: sessionUser.firstname, 
		lastname: sessionUser.lastname, email: sessionUser.email}});
});



app.get('/upload', function (req,res) {
	res.render('upload',{message:"Upload a image!"});
});

app.post('/single', uploadImage, function (req,res) {

	var tmp_path = req.file.path;
	var target_path = 'uploads/'+ req.file.originalname;

	var src = fs.createReadStream(tmp_path);
	var dest = fs.createWriteStream(target_path);
	src.pipe(dest);

	src.on('end',function () {
		res.render('upload',{message:"Great success!"})
	});

	src.on('error',function(err){
		res.render('upload',{message: "Uh-oh! something went wrong!"});
		console.error(err.stack);
	});


});

app.post('/multiple', uploadBatch, function (req,res) {
	
	var files = req.files;
	var tmp_path,target_path,src,dest;

	files.forEach(function(file) {
		
		tmp_path = file.path;
		target_path = 'uploads/'+ file.originalname;
	
		src = fs.createReadStream(tmp_path);
		dest = fs.createWriteStream(target_path);
		src.pipe(dest);

	});

	src.on('end',function () {
		res.render('upload',{message:"Great success!"})
	});

	src.on('error',function(err){
		res.render('upload',{message: "Uh-oh! something went wrong!"});
		console.error(err.stack);
	});

})

app.post('/all', uploadAlbum, function (req,res) {
	
	var album = req.files["photos"];
	var avatar = req.files["avatar"];

	var tmp_path,target_path,src,dest;

	album.forEach(function(file) {
		
		tmp_path = file.path;
		target_path = 'uploads/'+ file.originalname;
	
		src = fs.createReadStream(tmp_path);
		dest = fs.createWriteStream(target_path);
		src.pipe(dest);

	});

	tmp_path = avatar[0].path
	target_path = 'uploads/avatars/' + avatar[0].originalname
	src = fs.createReadStream(tmp_path);
	dest = fs.createWriteStream(target_path);
	src.pipe(dest);

	src.on('end',function () {
		res.render('upload',{message:"Great success!"})
	});

	src.on('error',function(err){
		res.render('upload',{message: "Uh-oh! something went wrong!"});
		console.error(err.stack);
	});



})

app.post('/login', function (req,res) {
	res.send("Form data sent: " + req.body.username + ", " + req.body.password);
	console.log(req.body);
})


// error handler middleware
app.use(function (req,res,next) {
	var err = new Error("Not found");
	err.status = 404
	next(err)
})


app.use(function (err,req,res,next) {

	res.status(err.status || 500);
	res.render('error',{error: err})

})


app.listen(3000,function () {
	console.log("server is running at 127.0.0.1:3000");

})