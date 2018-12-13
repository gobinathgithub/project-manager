var express = require('express');
var Router = express.Router();

const UserController = require('./../controller/user.controller');

Router.post('/addUser', UserController.creatUser);
Router.post('/updateUser', UserController.updateUser);
Router.get('/getUser', UserController.getAllUser);
Router.post('/deleteUser', UserController.deleteUser);

module.exports = Router;