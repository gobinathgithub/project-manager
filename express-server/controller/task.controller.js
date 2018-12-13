const Task = require('./../model/task');

module.exports = {
    creatTask: function (request, response) {
        var task = new Task(request.body);
        task.save(function (err) {
            if (!!err) {
                response.json({ success: false, message: err.message });
            } else {
                response.status(201).json({ success: true, data: 'Your task has created successfully..!!' });
            }
        })
    },
    updateTask: function (request, response) {
        var task = new Task(request.body);
        Task.findByIdAndUpdate(request.body._id, { projectId: task.projectId, task: task.task, parent:task.parent, startDate: task.startDate, 
            endDate: task.endDate, priorty: task.priorty, finished: task.finished, parentTask: task.parentTask, userId: task.userId, status: task.status },
            function (err) {
                if (!!err) {
                    response.json({ success: false, message: err.message });
                } else {
                    response.status(201).json({ success: true, data: 'Your task has updated successfully..!!' });
                }
            }
        )
    }, 
    getAllTask: function (request, response) {
        Task.find({}).exec(function (err, tasks) {
            if (!!err) {
                response.json({ success: false, message: err.message });
            } else {
                response.status(201).json({ success: true, data: tasks });
            }
        })
    }
}