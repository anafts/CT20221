const express = require('express');

const routes = express.Router();

routes.get('/', (res, req) => {
    return res.json({
         message: " hello world",
    })
});

module.exports = routes;