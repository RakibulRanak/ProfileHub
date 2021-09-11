const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {

    username: {
        type: DataTypes.STRING,
        noUpdate: true,
        allowNull: false,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    address: {
        type: DataTypes.STRING,
    },
    biography: {
        type: DataTypes.TEXT
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: "user.png"
    },
    fb_link: {
        type: DataTypes.STRING,
    },

    linkedin_link: {
        type: DataTypes.STRING,
    },
    git_link: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING
    },
    date_of_birth: {
        type: DataTypes.DATE,
        validate: {
            isAfter: "1950-12-30"
        }
    },
    skills: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    }
});

module.exports = User;
