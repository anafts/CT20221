const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Kdramas = require('../models/Kdramas');
const Users = require('../models/Users');

const connection = new Sequelize(dbConfig);

Kdramas.init(connection);
Users.init(connection);

module.exports = connection;