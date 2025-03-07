const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequaliseDB');

const Designations = sequelize.define('Designation', {
    desigid: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
    },
    desigName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Designations;