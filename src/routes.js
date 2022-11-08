const express = require('express');
const KdramaController = require('./controllers/KdramaController');
const SummaryController = require('./controllers/SummaryController');

const routes = express.Router();

routes.get('/kdrama', KdramaController.index );
routes.post('/kdrama', KdramaController.store );
routes.get('/kdrama/:id', KdramaController.findById );
routes.delete('/kdrama/:id', KdramaController.removeById );
routes.put('/kdrama/:id', KdramaController.updateById );

routes.get('/summary', SummaryController.index);


module.exports = routes;