const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
var db = require('../database')
var Sequelize = require('sequelize')

const ordersModel = require('../models/orders')
const ordersMenuModel = require('../models/ordersMenus')
const ordersArticlesModel = require('../models/ordersArticles')
const articlesModel = require('../models/articles')
const menuModel = require('../models/menus')
const restaurantModel = require('../models/restaurants')
const deliveryModel = require('../models/DeliveryMans')
const userModel = require('../models/users')


class restaurantOrdersController {
    async getRestaurantOrders(req,res){
        db.query('EXEC getRestaurantOrders '+req.params.restaurantId)
        .then(result => res.status(200).send(result[0][0].OrdersList))
        .catch(error => res.status(500).send(error))
    }
    async getDeliveryManOrders(req,res){

        ordersModel.findAll({
            where:{
                userId:req.params.userid,
            }
        }).then(orderList => {
            res.status(200).send(orderList)
        })
    }
    async addOrder(req,res){
        
        try {
            const order =  await ordersModel.create({"userId":req.body.userID,"restaurantId":req.body.restaurantID,"comment": req.body.comment,"status":"pendingValidation"})
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

    
}

module.exports = new restaurantOrdersController();