const express = require('express');
const routes = express.Router();

routes.use('/auth', require('./auth'));
routes.use('/user', require('./user'));
routes.use('/chat', require('./chat'));

module.exports = routes;