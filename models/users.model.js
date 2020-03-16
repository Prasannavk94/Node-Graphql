const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	password: {
		type: String,
		required: true
	},
	mobile: {
		type: Number,
		required: true,
		index: {
			unique: true
		}
	}
}).pre('save', function(next) {
	if (!this.isModified('password')) return;
	bcrypt.genSalt(saltRounds, (err, salt) => {
		if (err) return err;
		bcrypt.hash(this.password, salt, (err, hash) => {
			if(err) return err;
			this.password = hash;
			next();
		})
	})
});

const User = mongoose.model('User', UserSchema);
module.exports = User;