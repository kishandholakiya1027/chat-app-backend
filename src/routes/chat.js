const express = require('express');
const routes = express.Router();
const chatController = require('../controllers/chatController');

routes.post('/add', chatController.Add);
routes.get('/get', chatController.Get);
routes.get('/get/:id', chatController.GetOne);
routes.delete('/delete/:id', chatController.Delete);
routes.put('/edit/:id', chatController.Edit);
// routes.post('/get_chat/:id', chatController.Edit);

module.exports = routes;