var mongoose = require('mongoose');
var TaskSchema = new mongoose.Schema({
    project: { type: mongoose.Schema.ObjectId, ref: 'Project', required: false },
    task: { type: String, required: false, unique: true, dropDups: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    priorty: { type: Number, required: false, min: 0, max: 30 },
    status: { type: Boolean, default: false },
    parent: { type: mongoose.Schema.ObjectId, ref: 'Task', required: false },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    parentTask: { type: Boolean, default: false }
});
var Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
