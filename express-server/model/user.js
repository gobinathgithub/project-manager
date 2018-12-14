var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    employeeId: { type: Number, required: true, unique: true, dropDups: true }
});
var Project = mongoose.model('User', UserSchema);
module.exports = Project;
