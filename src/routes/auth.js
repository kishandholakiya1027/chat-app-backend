const express = require('express');
const routes = express.Router();
const authController = require('../controllers/authController');

routes.post('/register', authController.Register);
routes.post('/login', authController.Login);

module.exports = routes;