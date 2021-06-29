const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
var db = require('../database')
var Sequelize = require('sequelize')

const ordersModel = require('../models/orders')
const ordersMenuModel = require('../models/ordersMenus')
const ordersArticlesModel = require('../models/ordersArticles')



class restaurantOrdersController {

    async getRestaurantOrdersHistory(req,res){
        console.log('lolilo2')
        db.query('EXEC getRestaurantOrdersHistory '+req.params.restaurantId)
        .then(result => {console.log(result);res.status(200).send(result[0][0].OrdersList)})
        .catch(error => res.status(500).send(error))
    }

    async getRestaurantCurrentOrders(req,res){
        console.log('lolilo')
        db.query('EXEC getRestaurantOrders '+req.params.restaurantId)
        .then(result =>{console.log('result');res.status(200).send(result[0][0].OrdersList)} )
        .catch(error => {console.log('error');res.status(500).send(error)})
    }

    async getDeliveryCurrentOrder(req,res){
        db.query('EXEC getDeliveryMenCurrentOrder '+req.params.deliveryManId)
        .then(result => {console.log(result);res.status(200).send(result[0][0].deliveryManCurrentOrder)})
        .catch(error => res.status(500).send(error))
    }

    async addOrder(req,res){
        console.log(req.body)
        try {
            const order =  await ordersModel.create({"userId":req.body.userId,"restaurantId":req.body.restaurantId,"comment": req.body.comment,"orderDate": req.body.orderDate,"status":"pendingValidation","price":req.body.price})
            .then(row => { db.query('SELECT @@IDENTITY', {type: Sequelize.QueryTypes.SELECT}) 
                .then(id => {
                    req.body.Articles.forEach( article =>  {
                        ordersArticlesModel.create({"articleId":article.id,"orderId":id[0][''],"quantity":article.quantity}).catch(err => res.status(500).send(err))
                    });
                    console.log(id[0]['']);
                    req.body.Menus.forEach(menu => {
                        ordersMenuModel.create({"menuId":menu.id,"orderId":id[0][''],"quantity":menu.quantity}).catch(err => res.status(500).send(err))
                    })
                })
            }
            
        )
        res.status(200).send("commande ajouter")
        } catch(ex){
            console.log(ex)
            res.status(500).send(ex)
        } 
        // enclenche la gestion des status
    }    

    async getUsersOrders(req,res){
        db.query('EXEC getUserOrders '+req.params.userId)
        .then(result => res.status(200).send(result[0][0].OrdersList))
        .catch(error => res.status(500).send(error))
    }

    async deleteUsersOrders(req,res){
            ordersModel.update({
                userId: null
            },{ where:
                    {
                        'id':req.params.orderId
                    }
                }
            )
            .then( () => {
                res.status(200).send("succesly removed")
            }).catch((err) => {
                res.status(500).send(err)
            })
    }

    async deleteRestaurantOrders(req,res){
        ordersModel.update({
            restaurantId: null
        },{ where:
                {
                    'id':req.params.orderId
                }
            }
        )
        .then( () => {
            res.status(200).send("succesly removed")
        }).catch((err) => {
            res.status(500).send(err)
        })
        
    }

    async AcceptDelivery(req,res){
        ordersModel.update({
            deliveryManId: req.body.deliveryManId
        },{ where:
                {
                    'id':req.body.orderId
                }
            }
        )
        .then( () => {
            res.status(200).send("succesly removed")
        }).catch((err) => {
            res.status(500).send(err)
        })
}

    
}

module.exports = new restaurantOrdersController();