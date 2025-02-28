const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize');

const Task = sequelize.define('Task',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        decription: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }
);

module.exports = Task;