var express = require('express');
var router = express.Router();


var Comment = require('../models/comment');
var auth = require('../middlewares/auth');

router.get('/write', function(req, res, next) {
  if (!req.session.user) {
  	res.redirect('/')
  }
  else{
  	res.render('comments/post',{user:req.session.user});	
  }
  
});

router.post('/post',auth,function(req,res) {
	
	//auth appends user to the req
	user = req.user.username
	text = req.body.text
	
	//generate random number for comment id 
	var id = Math.floor(Math.random() * 1000);
	Comment.create(id,user,text,function (err,comment) {
		
		//send comment that was sent to verify creation
		res.send(comment)
	})

})

router.get('/:id', function (req,res) {
	Comment.get(req.params.id,function (err,comment) {
		res.render('comments/comment',{comment:comment})
	})
})

router.get('/all', function (req,res) {
	Comment.all(function(err,docs){
		res.json(docs);
	})
})

router.get('/all/:user', function (req,res) {
	Comment.allByUser(req.params.user,function(err,docs){
		res.render('comments/list',{comments:docs})
	})
})


module.exports = router;