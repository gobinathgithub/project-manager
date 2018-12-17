var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://database/ProjectManagerApp', { userNewUrlParser: true }, function(err, response) {
    if (!!err) {
        console.log('Currently we are not able to connect it: ' + err );
    } else {
        console.log('Connection extablised successfully..!! ' + db + ' with response of ' + response);
    }
});