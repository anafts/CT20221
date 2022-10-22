const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Kdramas = require('../models/Kdramas');

const connection = new Sequelize(dbConfig);

Kdramas.init(connection);

module.exports = connection;