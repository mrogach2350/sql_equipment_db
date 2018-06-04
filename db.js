require('dotenv').config();
Sequelize = require('sequelize');
sequelize = new Sequelize({
    database: process.env.DATABASE,
    username: process.env.NAME || 'root',
    password: process.env.PASSWORD,
    host: process.env.HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};