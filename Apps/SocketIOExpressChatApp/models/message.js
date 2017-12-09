var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:port/my_db');

var MessageSchema = mongoose.Schema({

	user: String,
	text: String,
	date: {type: Date, default: Date.now }

});

var Message = mongoose.model('Message',MessageSchema);


// Create new message in your database
exports.create = function(user, text, date, callback) {
  var newMessage = new Message ({
    user: user,
    text: text,
  });

  newMessage.save(function(err){
    if(err){
      return callback(err);
    }
   
  })
}

// Get all messages
exports.getAll = function(callback) {
 //need to check how this works...
  Message.find(function(err,docs){  
    if (err){
        return callback(err)
      } 
      callback(null, docs)
    });
}

// Get all messages by a particular user
exports.getAllByUser = function(searchUser, callback) {
  Message.find({user:searchUser}, function(err, docs) {
    if (err){
      return callback(err)
    } 
    callback(null, docs)
  })
}