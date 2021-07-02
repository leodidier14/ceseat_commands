const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
var db = require('../database')
var Sequelize = require('sequelize')


const ordersModel = require('../models/orders')
const restaurantModel = require('../models/restaurant')
const userModel = require('../models/user')
const addressModel = require('../models/address')



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
                await this.GetOrderInfo(orders.dataValues).then(async (data) =>{
                    await socket.emit('NewOrderToDelivery',data)
                }
                )
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
                if(orders.dataValues.deliverymanId == null){
                    await this.GetOrderInfo(orders.dataValues).then(async (data) =>{
                        await socket.emit('NewOrderToDelivery',data)
                    }
                    )
                }
                
                res.status(200).send("status change")    
            })
        }).catch((err) => {
            res.status(400).send(err)
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
            ordersModel.findOne({where:{id:req.body.id}}).then(async orders => {
                var socket = await req.app.get('socket')
                await socket.emit('DeliveredOrder' + orders.dataValues.restaurantId,{status:req.body.status,id:orders.dataValues.id})
                await socket.emit('UpdateStatement' + orders.dataValues.userId,{status:req.body.status,id:orders.dataValues.id})
                res.status(200).send("status change")
            })
        }).catch((err) => {
            res.status(400).send(err)
        })
    };
    
    GetOrderInfo(orders){
        return new Promise(async (resolve,reject)=>  {
                var dbuser = await userModel.findOne({where:{id:orders.userId}}).catch(err => {reject(err)})
                var restaurantId = await orders.restaurantId
                var dbrestaurant = await restaurantModel.findOne({where:{id:restaurantId}}).catch(err => {reject(err)})
                var userAdresseId = await dbuser.dataValues.addressid
                var userAddress = await addressModel.findOne({where:{id:userAdresseId}}).catch(err => {reject(err)})
                var restaurantAdresseId = await dbrestaurant.dataValues.addressid
                var restaurantAddress = await addressModel.findOne({where:{id:restaurantAdresseId}}).catch(err => {reject(err)})

                resolve({
                    number: orders.id,
                    clientName: dbuser.dataValues.lastName + ' ' + dbuser.dataValues.firstName,
                    clientAddress:{
                        address: userAddress.address,
                        city: userAddress.city,
                        zipCode: userAddress.zipCode,
                        country: userAddress.country
                    },
                    clientPhone: dbrestaurant.dataValues.phone,
                    restaurantName: dbrestaurant.dataValues.name,
                    restaurantAddress:{
                        address: restaurantAddress.address,
                        city: restaurantAddress.city,
                        zipCode: restaurantAddress.zipCode,
                        country: restaurantAddress.country
                    },
                    restaurantPhone: dbrestaurant.phone,
                    "status":orders.status,
                    price:orders.price,
                    comment:orders.comment,

                })
        })
    }
    async AcceptDelivery(req,res){
        console.log('ici deliv accept')
        ordersModel.findOne({where:{
            'id':req.body.id
        }}).then( async (result) =>{
            if(result.dataValues.deliveryManId == null){
                ordersModel.update({
                    deliveryManId: req.body.deliverymanId
                },{ where:
                        {
                            'id':req.body.id
                        }
                    }
                )
                .then( () => {
                    res.status(200).send("succesly removed")
                }).catch((err) => {
                    res.status(500).send(err)
                })
            }
        })
    }
}

module.exports = new statementController();