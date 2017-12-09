var express = require('express');
var router = express.Router();


/* GET home page. */

//if the user is logged in, immediately go to there homepage
router.get('/', function(req, res, next) {
 	if (req.session.user) {
 		res.render('users/homepage',{user:req.session.user})
 	}

  	else{
  		res.render('index');	
 	}
  
});

//just to test the session for the user
router.get('/session',function (req,res) {
	res.send(req.session)
})


module.exports = router;
