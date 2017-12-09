var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


var usersSchema = mongoose.Schema({
	id:Number,
	username: String,
	email: String
})

var User = mongoose.model("User",usersSchema);

mongoose.connect('mongodb://localhost/chapter6db')


//GET = Read
router.get('/',function (req,res) {
	User.find(function(err,response) {
		if (err) {
			res.send(err)
		}
		else{
			res.json(response)
		}
	})
});



router.get('/users/:id([0-9]{1,4})',function (req,res) {
	User.findOne({id:req.params.id},function(err,response) {
		if (err) {
			res.send(err)
		}
		else{
			res.json(response)
		}
	})
});


//GET certain record
router.get('/users/:id([0-9]{1,3})',function (req,res) {
	var neededUser = users.filter(function (user) {
		if (user.id == req.params.id) {
			return true;
		}
		else{
			return false;
		}
	});

	if(neededUser){
		res.json(neededUser)
	}
	else{
			res.status('404').send('The record is not found!')
		}	
});


//get create form
router.get('/create',function (req,res) {
	res.render('create',{message: "Create a new user"})
})

//POST = Create
router.post('/create', function (req,res) {
	
	var submitData = req.body
	if (!submitData.id || !submitData.username || !submitData.email ) {
		res.send("ERROR! Invalid input")
	}
	else{

		var newUser = new User({
			id: submitData.id,
			username: submitData.username,
			email: submitData.email
		})

		
		newUser.save(function (err,response) {
			if (err) {
				res.send(err)
			}
			else{
				res.redirect('/users');
			}
		})
	}
})

//PUT = Udpate
 
router.post('/update',function (req,res) {
	var formData = req.body
	User.findOneAndUpdate({id:formData.id},{
		
			username: formData.username,
			email: formData.email

		}, function (err,response) {
			if (err) {
				res.send(err)
			}
			else{
				res.render('create',{message:"record with id" + formData.id + "updated"} )
			}
	})

})

router.post('/delete',function (req,res) {
	var id = req.body.id
	User.findOneAndRemove({id:id},function(err,response) {
		if (err) {
			res.send(err)
		}
		else{
			res.render('create',{message:"record with id" + id + "deleted"} )
		}
	})


})


//DELETE = Delete




module.exports = router;
