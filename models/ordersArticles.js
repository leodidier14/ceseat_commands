var Sequelize = require('sequelize')
var db = require('../database')

var OrderArticle = db.define("Order_Articles",{
    orderId:{
        type: Sequelize.INTEGER,
        foreignkey: true,
        primaryKey: true
    },
    articleId:{
        type: Sequelize.INTEGER,
        foreignkey: true,
        primaryKey: true
    },
    quantity : Sequelize.INTEGER,
})

module.exports = OrderArticle;