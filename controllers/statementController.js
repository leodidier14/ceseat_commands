const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
var db = require('../database')
var Sequelize = require('sequelize')

const ordersModel = require('../models/orders')

class statementController {

    async OrderValidation(req,res){
        ordersModel.update({
            status: 'pendingRealization'
        },{ where:
                {
                    'id':req.body.orderId
                }
            }
        )
        .then( () => {
            res.status(200).send("status change")
        }).catch((err) => {
            res.status(500).send(err)
        })
    }  
    
    async OrderDenied(req,res){
        ordersModel.update({
            status: 'denied'
        },{ where:
                {
                    'id':req.body.orderId
                }
            }
        )
        .then( () => {
            res.status(200).send("status change")
        }).catch((err) => {
            res.status(500).send(err)
        })
    }

    async OrderInRealization(req,res){
        ordersModel.update({
            status: 'realization'
        },{ where:
                {
                    'id':req.body.orderId
                }
            }
        )
        .then( () => {
            res.status(200).send("status change")
        }).catch((err) => {
            res.status(500).send(err)
        })
    }

    async OrderWaitingDelivery(req,res){
        ordersModel.update({
            status: 'pendingDelivery'
        },{ where:
                {
                    'id':req.body.orderId
                }
            }
        )
        .then( () => {
            res.status(200).send("status change")
        }).catch((err) => {
            res.status(500).send(err)
        })
    }

    async OrderInDelivery(req,res){
        ordersModel.update({
            status: 'delivery'
        },{ where:
                {
                    'id':req.body.orderId
                }
            }
        )
        .then( () => {
            res.status(200).send("status change")
        }).catch((err) => {
            res.status(500).send(err)
        })
    }

    async OrderDelivered(req,res){
        ordersModel.update({
            status: 'delivered'
        },{ where:
                {
                    'id':req.body.orderId
                }
            }
        )
        .then( () => {
            res.status(200).send("status change")
        }).catch((err) => {
            res.status(500).send(err)
        })
    }
}

module.exports = new statementController();