const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userController');

routes.get('/get', userController.Get);
routes.get('/get/:id', userController.GetOne);
routes.delete('/delete/:id', userController.Delete);
routes.put('/edit/:id', userController.Edit);
routes.post('/get_all', userController.GetAll);

module.exports = routes;