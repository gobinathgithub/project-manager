var express = require('express');
var bodyParser = require('body-parser');
var server = express();
var port = 3030;
var host = 'localhost';
var cors = require('cors');

server.use("/", express.static('web'));
server.use(bodyParser.json());
server.use(cors());

var taskRouter = require('./routes/task.router');
server.use("/api/task", taskRouter);

var userRouter = require('./routes/user.router');
server.use("/api/user", userRouter);

var projectRouter = require('./routes/project.router');
server.use("/api/project", projectRouter);

server.listen(port, host, function(err){
    if(!!err){
        console.log("Could not start the server");
        throw err;
    }
    console.log('Server is running at '+host+':'+port);
    // database connection
    require("./database/db")

})

