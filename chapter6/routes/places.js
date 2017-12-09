var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var placesSchema = mongoose.Schema({
	id:Number,
	name: String,
	addess: String,
	type: String
})

var Place = mongoose.model("Place",placesSchema);

mongoose.connect('mongodb://localhost/chapter6db')


router.get('/tool', function(req, res, next) {
  res.render('tool', { message: 'Add Place to DB' });
});

//read/get all place records
router.get('/', function(req, res, next) {
  Place.find(function (err,response) {
  	res.json(response);
  })
});

router.get('/search',function (req,res) {
	var search = req.query.search;
	Place.find({name:search.toLowerCase()},function (err,response) {
		if (err) {
			res.render('tool',{message: "record not found!"})
		}
		else{
			var results = JSON.stringify(response)
			res.render('tool',{message:"Results:", newData: results})
		}
	})
})

router.get('/update/:id',function (req,res) {
	Place.update({id:req.params.id},{type: 'restaurant'},function (err,response) {
		if (err) {
			res.send(err)
		}
		else{
			res.send(response)
		}
	})
})

router.get('/delete/:type',function (req,res) {
	Place.remove({type:req.params.type},function (err,response) {
		if (err) {
			res.send(err)
		}
		else{
			res.send(response)
		}
	})
})



//process adding new place to records 
router.post('/addPlace', function (req,res) {
	
	var placeInfo = req.body;
	if (!placeInfo.id || !placeInfo.name || !placeInfo.address || !placeInfo.type) {
		res.render('tool',{message: "you left certain inputs blank!"});
	}
	else{
		var newPlace = new Place({
			id: placeInfo.id,
			name: placeInfo.name.toLowerCase(),
			address: placeInfo.address.toLowerCase(),
			type: placeInfo.type
		});

		newPlace.save(function (err,response) {
			if (err) {
				res.render('tool', {message: "error with db!"})
				console.log(err);
			}
			else{
				res.render('tool',{message: "New place successfully added!", newData: newPlace.id})
			}
		})
	}
})


module.exports = router;
