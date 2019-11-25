const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Libreria para codificación de la información del usuario en la base de datos

const UserSchema = new Schema({
	username: {type: String, unique: false, lowercase: true, required: true},
	email: { type: String, unique: true, lowercase: true, required: true },
	password: { type: String, required: true },
});


module.exports = mongoose.model('Users',UserSchema);