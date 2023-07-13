const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const mongodbErrorHandler = require('mongoose-mongodb-errors')

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(mongodbErrorHandler , uniqueValidator);

module.exports = mongoose.model('User', userSchema);