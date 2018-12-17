const Project = require('./../model/project');
const Task = require('./../model/task');

module.exports = {
    creatProject: function (request, response) {
        var project = new Project(request.body);
        project.save(function (err) {
            if (!!err) {
                response.json({ success: false, message: err.message });
            } else {
                response.status(201).json({ success: true, data: 'Your Project has created successfully..!!' });
            }
        })
    },
    updateProject: function (request, response) {
        var project = new Project(request.body);
        Project.findByIdAndUpdate(request.body._id, { projectName: project.projectName, startDate:project.startDate, endDate: project.endDate, 
            priorty: project.priorty, manager: project.manager },
            function (err) {
                if (!!err) {
                    response.json({ success: false, message: err.message });
                } else {
                    response.status(201).json({ success: true, data: 'Your Project has updated successfully..!!' });
                }
            }
        )
    }, 
    getAllProject: function (request, response) {
        Project.find({}).exec(function (err, projects) {
            if (!!err) {
                response.json({ success: false, message: err.message });
            } else {
                response.status(201).json({ success: true, data: projects });
            }
        })
    },
    deleteProject: function (request, response) {
        Task.remove({project : request.body},
            function (err) {
                if (!!err) {
                    response.json({ success: false, message: err.message });
                } else {
                    Project.remove({ _id: request.body },
                        function (err) {
                            if (!!err) {
                                response.json({ success: false, message: err.message });
                            } else {
                                response.status(201).json({ success: true, data: 'Project information deleted successfully..!!' });
                            }
                        }
                    )
                }
            }
        )
    }
}