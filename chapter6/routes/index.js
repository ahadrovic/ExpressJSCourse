var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



//GET = Read
/*

router.get('/users',function (req,res) {
	res.json(users);
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
	if (!submitData.username || !submitData.email ) {

		res.send("ERROR! Invalid input")
	}
	else{

		var newId = users[users.length - 1].id + 1;
		users.push({
			"id":newId,
			"username":submitData.username,
			"email":submitData.email
		});

		res.redirect('/users');

	}
})

//PUT = Udpate
router.put('/update/:id([0-9]{1,3})',function (req,res) {
	
	var newUsername = " newUsername1337"
	var newEmail = "newEmail@email.com"

	var foundUser = users.filter(function(user) {
		if (user.id == req.params.id) {
			return true
		}
		else{
			return false
		}

	})

	if (foundUser) {
			users[req.params.id].username = newUsername;
			users[req.params.id].email = newEmail;
			res.json(users);
		}
		else{
			res.send("ERROR!")
		}


})

router.delete('/delete/:id([0-9]{1,3})',function (req,res) {
	
	var foundUser = users.filter(function(user) {
		if (user.id == req.params.id) {
			return true
		}
		else{
			return false
		}

	})

	if (foundUser) {
			delete users.foundUser;
			res.json(users);
		}
		else{
			res.send("ERROR!")
		}


})


*/




module.exports = router;
