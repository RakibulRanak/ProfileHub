const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Project = sequelize.define('project', {

    projectname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    link: {
        type: DataTypes.STRING(50)
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE
    },
    description: {
        type: DataTypes.TEXT
    }
});

module.exports = Project;
