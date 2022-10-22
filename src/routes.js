const express = require('express');
const UserController = require('./controllers/KdramaController');

const routes = express.Router();

routes.get('/kdrama', UserController.index );
routes.get('/kdrama/:id', UserController.findById );
routes.post('/kdrama', UserController.store );
routes.delete('/kdrama/:id', UserController.removeById );
routes.put('/kdrama/:id', UserController.updateById );



module.exports = routes;