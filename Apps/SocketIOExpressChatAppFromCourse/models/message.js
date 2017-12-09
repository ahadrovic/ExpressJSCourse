var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
	user:String,
	text: String,
	date: Date
})

var Message = mongoose.model('Message',messageSchema);


exports.create = function (user,text,date,callback) {
	var newMessage = new Message({
		user:user,
		text:text,
		date:date
	});

	newMessage.save(function(err) {
		if (err) {
			return callback(err)
		}
	});
}

exports.getAll = function (callback) {
	Message.find({},function (err,docs) {
		if (err) {
			return callback(err);
		}
		callback(null,docs);
	});
}


exports.getAllByUser = function (searchUser, callback) {
	Message.find({user: searchUser},function (err,docs) {
		if (err) {
			return callback(err);
		}
		return callback(null,docs);
	});
}