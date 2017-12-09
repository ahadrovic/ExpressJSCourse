
module.exports = function (code) {
	return function (req,res,next) {
		switch(code){
			case 500:
				res.send("There was an error on the server! Sorry about that!");
			case 404:
				res.send("Oops! File not found!")
			case 403:
				res.send("Forbidden!")
			default:
				res.send("Everythin is A-OK!")
				next();
		}
	}
}