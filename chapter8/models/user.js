var mongoose= require("mongoose")
var bcrypt = require("bcrypt")


var usersSchema = mongoose.Schema({
	id: Number,
	username: String,
	password: String,
	email: String
})

var User = mongoose.model('User',usersSchema);

exports.create = function (id,name,email,password,callback) {
	bcrypt.hash(password,10,function (err,hash) {
		
		if (err) {
				return callback(err)
			}
	
		var newUser = new User({
			id: id,
			username: name,
			email: email,
			password: hash
		})

		newUser.save(function (err,response) {
			if (err) {
				return callback(err)
			}
			callback(null,response)
		})

	})
}

exports.get = function (id,callback) {
	User.findOne({id:id},function (err,doc) {
		if (err) {
			return callback(err)
		}
		callback(null,doc)
	})
}


exports.authenticate = function (username,password,callback) {
	User.findOne({username:username},function (err,doc) {
		if (err) {
			return callback(err)
		}

		if(doc == null) {
			err = new Error("User Not found")
			err.status = 500;
			return callback(err);
		}

		else{

			//compare the encrpyted password with the input password
			bcrypt.compare(password,doc.password,function (err,response) {
				
				if (err) {
					return callback(err)
				}
				
				//we can use with or without return. both work
				return callback(null,doc) // send the data from the db to the controller
			
			})
		}
		

	})
}

exports.changePassword = function (id,password,callback) {
	bcrypt.hash(password,10, function (err,hash) {
			User.findOneAndUpdate({id:id},{password:hash},function(err,updated){
			if (err) {
				return callback(err)
			}
			callback(null,updated > 0)
		})
	})
}

