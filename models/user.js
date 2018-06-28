const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


//User Schemna
const UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password:{
		type: String
	},
	email:{
		type:String
	},
	name:{
		type:String
	}
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        // Store hash in your password DB.
	        newUser.password = hash;
	        newUser.save(callback);
	    });
});
}

module.exports.getUserByUsername = (username, callback) => {
	const query = {username:username};
	User.findOne(query, callback);
}

module.exports.getUserById = (id, callback) => {
	
	User.findById(id, callback);
}


module.exports.comparePassword = (cadidatePassword, hash, callback) => {
	bcrypt.compare(cadidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	
    	callback(null, isMatch);
	});
}