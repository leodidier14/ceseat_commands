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
                    'id':req.body.id
                }
            }
        )
        .then( () => {
            ordersModel.findOne({where:{id:req.body.id}}).then(async orders => {
                var socket = await req.app.get('socket')
                await socket.emit('UpdateStatement' + orders.dataValues.userId,{status:'pendingRealization',id:orders.dataValues.id})
                res.status(200).send("status change")
            })
        }).catch((err) => {
            res.status(400).send(err)
        })
    };

    async StatementUpdate(req,res){
        ordersModel.update({
            status: req.body.status
        },{ where:
                {
                    'id':req.body.id
                }
            }
        )
        .then( () => {
            ordersModel.findOne({where:{id:req.body.id}}).then(async orders => {
                var socket = await req.app.get('socket')
                await socket.emit('UpdateStatement' + orders.dataValues.userId,{status:req.body.status,id:orders.dataValues.id})
                res.status(200).send("status change")    
            })
        }).catch((err) => {
            res.status(400).send(err)
        })
    };

    async OrderDelivered(req,res){
        ordersModel.update({
            status: req.body.status
        },{ where:
                {
                    'id':req.body.id
                }
            }
        )
        .then( () => {
            ordersModel.findOne({where:{id:req.body.id}}).then(async orders => {
                var socket = await req.app.get('socket')
                await socket.emit('DeliveredOrder' + orders.dataValues.restaurantId,orders.dataValues.id)
                await socket.emit('UpdateStatement' + orders.dataValues.userId,orders.dataValues.id)
                res.status(200).send("status change")
            })
        }).catch((err) => {
            res.status(400).send(err)
        })
    };

    


}

module.exports = new statementController();