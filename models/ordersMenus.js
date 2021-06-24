var Sequelize = require('sequelize')
var db = require('../database')

var OrderMenu = db.define("Order_Menus",{
    orderId:{
        type: Sequelize.INTEGER,
        foreignkey: true,
        primaryKey: true
    },
    menuId:{
        type: Sequelize.INTEGER,
        foreignkey: true,
        primaryKey: true
    },
    quantity : Sequelize.INTEGER,
})

module.exports = OrderMenu;