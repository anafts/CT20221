const dotenv = require("dotenv");

dotenv.config()

module.exports = {
    dialect: 'postgres',
    host: process.env.SECRET_HOST,
    database: process.env.SECRET_BANK_NAME,
    username: process.env.SECRET_BANK_USER,
    password: process.env.SECRET_BANK_PASSWORD,
    define: {
    timestamps: true,
    underscored: true,
  },
};