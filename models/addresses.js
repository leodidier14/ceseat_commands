var Sequelize = require('sequelize')
var db = require('../database')


var Address = db.define("Address", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    country: Sequelize.STRING,
    city: Sequelize.STRING,
    address: Sequelize.STRING,
    postcode: Sequelize.INTEGER

});

module.exports = Address;