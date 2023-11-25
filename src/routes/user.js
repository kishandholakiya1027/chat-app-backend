const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userController');

routes.get('/get/:id', userController.GetOne);
routes.post('/get_all', userController.GetAll);

module.exports = routes;