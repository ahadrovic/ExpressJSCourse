// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  name: String,
  vicinity: String,
  lat: Number,
  lng: Number,
  type: String
});

var Place = mongoose.model('Place', PlaceSchema);

PlaceSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });


  exports.getByType = function (type,callback) {
  	Place.find({type:type},function (err,docs) {
  		if (err) {
  			return callback(err)
  		}
  		else{
  			callback(null,docs)	
  		}
  		
  	})
  }

    exports.getAll = function (callback) {
  	Place.find({},function (err,docs) {
  		if (err) {
  			return callback(err)
  		}
  		else{
  			callback(null,docs)	
  		}
  		
  	})
  }



