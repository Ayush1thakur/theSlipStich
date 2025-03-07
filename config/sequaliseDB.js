const { Sequelize } = require('sequelize');
require("dotenv").config();

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('fse', 'root',process.env.SQL_PASS , {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports=sequelize;