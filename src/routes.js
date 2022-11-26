const express = require('express');

const KdramaController = require('./controllers/KdramaController');
const SummaryController = require('./controllers/SummaryController');
const UsersController = require('./controllers/UsersController');

const routes = express.Router();

// kdrama routers
routes.get('/kdrama', KdramaController.index );
routes.post('/kdrama', KdramaController.store );
routes.get('/kdrama/:id', KdramaController.findById );
routes.delete('/kdrama/:id', KdramaController.removeById );
routes.put('/kdrama/:id', KdramaController.updateById );

// Summary routers
routes.get('/summary/:release_year/:streamming_services', SummaryController.index);

// Users routers
routes.post('/signup', UsersController.signUp);
routes.post('/login', UsersController.login);

module.exports = routes;