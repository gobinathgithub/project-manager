var mongoose = require('mongoose');
var ProjectSchema = new mongoose.Schema({
    projectName: { type: String, required: true, unique: true, dropDups: true },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    priorty: { type: Number, required: true, min:0, max: 30 },
    managerId: { type: mongoose.Schema.ObjectId, ref: 'User', required: false },
    status: { type: Boolean, default: false }
});
var Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
