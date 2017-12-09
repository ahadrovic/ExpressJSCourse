var express = require('express');
var router = express.Router();
var bcrpyt = require("bcrypt")
var User = require('../models/user')


router.get('/register', function(req, res, next) {
  res.render('users/register', { message: 'Register new user' });
});

router.post('/register',function (req,res) {
	var newUserData = req.body;

	if (!newUserData.username || !newUserData.username) {
		res.render('users/register',{message:"The form was not filled out correctly!"})
	}

	if (newUserData.password != newUserData.passwordconf) {
		res.render('users/register',{message:"Passwords do not match!"})
	}
	else{

		User.get(newUserData.username,function (err,user) {
			if (user) {
				res.render('users/register',{message:"User already exists!"})
			}
			else{

				//generate random number for id
				var newId = Math.floor(Math.random() * 1000);

				//response contains the user that was just created
				User.create(newId, newUserData.username,newUserData.email,newUserData.password,function (err,response) {
					res.send(response)
				
				})
			}
		})
	}
})


router.get('/homepage',function (req,res) {
	if (req.session.user) {
		res.render('users/homepage',{user:req.session.user})
	}
	else{
		res.redirect('/')
	}
})

router.post('/login',function (req,res) {
	var loginData = req.body

	//response is the user that gets returned from the model
	User.authenticate(loginData.username,loginData.password,function (err,response) {
		if (err || response == null) {
			//display error sent from model if there is no user found
			res.send(err)
		}
		else{

			//login user immediately upon successful sign-up
			req.session.user = response
			res.redirect('/')
		}

	})
})


router.post('/logout',function (req,res) {
	req.session.user = null;
	res.redirect('/');
})
module.exports = router;
