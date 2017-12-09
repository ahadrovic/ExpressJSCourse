var express = require('express');
var Message = require('../models/message');
var router = express.Router();
/* GET home page. */
router.get('/all', function (req, res, next) {
  
    Message.getAll(function(err,docs){
        if(err){
          //send error to error handling middleware
            next(err);
        }
        else{
          res.json(docs); // if data is found, return as json data on page
        }

    });

});


router.get('/all/:user', function(req, res, next) {
  Message.getAllByUser(req.params.user, function (err,docs) {
  	if (err) {
  		next(err);
  	}
  	else{
  		res.json(docs)
  	}
  })
});


module.exports = router;
