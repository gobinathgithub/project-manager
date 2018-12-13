var express = require('express');
var Router = express.Router();

const TaskController = require('./../controller/task.controller');

Router.post('/addTask', TaskController.creatTask);
Router.post('/updateTask', TaskController.updateTask);
Router.get('/getTask', TaskController.getAllTask);

module.exports = Router;