var mongoose = require("mongoose")

var commentSchema = mongoose.Schema({

	id: Number,
	user: String,
	text: String,
	date : Date

});

var Comment = mongoose.model('Comment',commentSchema);

exports.create = function (id,user,text,callback) {
	var newComment = new Comment({
		id: id,
		user: user,
		text: text,
		date: Date.now()
	})

	newComment.save(function(err,response) {
		if (err) {
			return callback(err)
		}
		callback(null,response);
	})
}

exports.get = function (id,callback) {
	Comment.findOne({id:id},function (err,doc) {
		if (err) {
			return callback(err)
		}
		return callback(null,doc)
	})
}

exports.all = function (callback) {
	Comment.find({},function (err,docs) {
		if (err) {
			return callback(err)
		}
		callback(null,docs)
	})
}

exports.allByUser = function (user,callback) {
	Comment.find({user:user},function (err,docs) {
		if (err) {
			return callback(err)
		}
		callback(null,docs)
	})
}