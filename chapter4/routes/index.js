var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/request", function(req,res,next){
	console.log('request sent at: ' + Date.now());
	next()
},function(req,res){
	res.render('index', { title: 'Express' });
})

router.use("/user_page/:id",function (req,res,next) {
	if (req.params.id === '0') {
		res.render('index',{title: "Access Denied!"});
	}
	else{
		next()
	}
}, function(req,res,next){
	res.render('index',{title: "Welcome User!"})
}

)



module.exports = router;
