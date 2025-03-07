const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequaliseDB');

const Departments = sequelize.define('Department', {
            deptid: {
        type: DataTypes.INTEGER,
        primarykey: true,
        autoincrement: true,
        allowNull:false      
    },
            dname: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = Departments;

