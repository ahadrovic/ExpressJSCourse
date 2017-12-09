var User = require('../models/user')

module.exports = function (req,res,next) {
	
// check if user is logged in 
	if (req.session.user) {
		User.get(req.session.user.id,function (err,user) {
			if (user) {
				//append the user to the req object and move on to the next op in route
				req.user = user
				next()
			}
			else{

				err = new Error('something went wrong!')
				err.status = 500
				next(err) // send back error so error handling middleware can handle
			}

		})

	}
	
	else{
		err = new Error('access denied')
		err.status = 403 // forbidden 
		next(err) // send back error
	}
}