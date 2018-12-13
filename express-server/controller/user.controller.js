const User = require('./../model/user');

module.exports = {
    creatUser: function (request, response) {
        var user = new User(request.body);
        user.save(function (err) {
            if (!!err) {
                response.json({ success: false, message: err.message });
            } else {
                response.status(201).json({ success: true, data: 'User has created successfully..!!' });
            }
        })
    },
    updateUser: function (request, response) {
        var user = new User(request.body);
        User.findByIdAndUpdate(request.body._id, { firstName: user.firstName, lastName:user.lastName, employeeId: user.employeeId },
            function (err) {
                if (!!err) {
                    response.json({ success: false, message: err.message });
                } else {
                    response.status(201).json({ success: true, data: 'User information has updated successfully..!!' });
                }
            }
        )
    }, 
    getAllUser: function (request, response) {
        User.find({}).exec(function (err, users) {
            if (!!err) {
                response.json({ success: false, message: err.message });
            } else {
                response.status(201).json({ success: true, data: users });
            }
        })
    },
    deleteUser: function (request, response) {
        var user = new User(request.body);
        User.remove({ _id: user._id },
            function (err) {
                if (!!err) {
                    response.json({ success: false, message: err.message });
                } else {
                    response.status(201).json({ success: true, data: 'User information deleted successfully..!!' });
                }
            }
        )
    }
}