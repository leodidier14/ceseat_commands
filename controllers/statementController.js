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
            res.status(200).send("status change")
        }).catch((err) => {
            res.status(500).send(err)
        })
    };

    async StatementUpdate(req,res){
        console.log('ici')
        ordersModel.update({
            status: req.body.status
        },{ where:
                {
                    'id':req.body.id
                }
            }
        )
        .then( () => {
            res.status(200).send("status change")
        }).catch((err) => {
            res.status(500).send(err)
        })
    };

    async OrderDelivered(req,res){
        ordersModel.update({
            status: 'delivered'
        },{ where:
                {
                    'id':req.body.id
                }
            }
        )
        .then( () => {
            res.status(200).send("status change")
        }).catch((err) => {
            res.status(500).send(err)
        })
    };

    


}

module.exports = new statementController();