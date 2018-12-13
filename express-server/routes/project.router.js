var express = require('express');
var Router = express.Router();

const ProjectController = require('./../controller/project.controller');

Router.post('/addProject', ProjectController.creatProject);
Router.post('/updateProject', ProjectController.updateProject);
Router.get('/getProject', ProjectController.getAllProject);
Router.post('/deleteProject', ProjectController.deleteProject);

module.exports = Router;