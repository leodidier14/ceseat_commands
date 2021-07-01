var express = require('express');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
var router = express.Router();

const orderController = require('../controllers/ordersController.js')
const statementController = require('../controllers/statementController')

router.get('/available', function(req, res) {
  res.send(true)
});

// OrdersHistory for userid
router.get('/user/:userId', function(req, res) {
  orderController.getUsersOrders(req,res);
})

router.get('/deliveryman/:deliveryManId', function(req, res) {
  orderController.getDeliveryCurrentOrder(req,res);
})

// OrderHistory for restaurant
router.get('/restaurant/current/:restaurantId', function(req, res) {
  orderController.getRestaurantCurrentOrders(req,res)
});

router.get('/restaurant/history/:restaurantId', function(req, res) {
  orderController.getRestaurantOrdersHistory(req,res)
});

// add new order
router.post('/order', function(req, res) {
  orderController.addOrder(req,res)
});

// add new order
router.delete('/user/:orderId', function(req, res) {
  orderController.deleteUsersOrders(req,res)
});

// add new order
router.delete('/restaurant/:orderId', function(req, res) {
  orderController.deleteRestaurantOrders(req,res)
});


router.put('/statement/validate/:id', function(req, res) {
  statementController.OrderValidation(req,res)
});

router.put('/statement/update/:id', function(req, res) {
  statementController.StatementUpdate(req,res)
});

router.put('/statement/deliveryman/validate/:id', function(req, res) {
  statementController.AcceptDelivery(req,res)
});


router.put('/statement/delivered/:id', function(req, res) {
  statementController.OrderDelivered(req,res)
});


module.exports = router;
