var express = require('express');
var bcrypt = require('bcrypt')

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hash', function (req,res) {
	
	bcrypt.hash("input",10,function (err,hash) {
		bcrypt.compare("inpu2t",hash,function (err,hash) {
			res.send(hash)
		})
	})

})



module.exports = router;
