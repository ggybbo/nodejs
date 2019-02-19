const Sequelize = require('sequelize');
const sequelize = new Sequelize('udemy', 'root', 'gudwp4920',
  {
    dialect: 'mysql',
    host: 'localhost'
  }
);

module.exports = sequelize;