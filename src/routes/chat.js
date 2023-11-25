const express = require('express');
const routes = express.Router();
const chatController = require('../controllers/chatController');

routes.post('/add', chatController.Add);
routes.post('/get', chatController.Get);

module.exports = routes;