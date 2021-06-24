var Sequelize = require('sequelize')
var db = require('../database')


var Deliveryman = db.define("Deliverymans", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userid:{
        type: Sequelize.INTEGER,
        foreignkey: true,
    },
    siret: Sequelize.STRING,
    wallet: Sequelize.DECIMAL,
    sponsorship: Sequelize.STRING
});

module.exports = Deliveryman;