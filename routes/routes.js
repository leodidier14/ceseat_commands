var express = require('express');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
var router = express.Router();



const orderController = require('../controllers/ordersController.js')
const statementController = require('../controllers/statementController')

// OrdersHistory for userid
router.get('/orders/user/:userId', function(req, res) {
  console.log("Request on /orders/user/:userId")
  orderController.getUsersOrders(req,res);
})

router.get('/orders/deliveryman/:deliveryManId', function(req, res) {
  console.log("Request on /orders/deliveryman/:deliveryManId " +req.params.deliveryManId)
  orderController.getDeliveryCurrentOrder(req,res);
})

// OrderHistory for restaurant
router.get('/orders/restaurant/current/:restaurantId', function(req, res) {
  console.log("Request on /orders/restaurant/" + req.params.restaurantId)
  orderController.getRestaurantCurrentOrders(req,res)
});

router.get('/orders/restaurant/history/:restaurantId', function(req, res) {
  console.log("Request on /orders/restaurant/:restaurantId")
  orderController.getRestaurantOrdersHistory(req,res)
});

// add new order
router.post('/orders/order', function(req, res) {
  console.log("Request on /order")
  orderController.addOrder(req,res)
});

// add new order
router.delete('/orders/user/:orderId', function(req, res) {
  console.log("Request on /order whit :" + req.params.orderId)
  orderController.deleteUsersOrders(req,res)
});

// add new order
router.delete('/orders/restaurant/:orderId', function(req, res) {
  console.log("Request on /order whit :" + req.params.orderId)
  orderController.deleteRestaurantOrders(req,res)
});


router.put('/orders/statement/validate/:id', function(req, res) {
  console.log("/orders/statement/Validate")
  statementController.OrderValidation(req,res)
});

router.put('/orders/statement/update/:id', function(req, res) {
  console.log("/orders/statement/update/:id put")
  statementController.StatementUpdate(req,res)
});

/*

router.put('/orders/statement/delivered', function(req, res) {
  console.log("/orders/statement/delivered")
  statementController.OrderDelivered(req,res)
});
router.put('/orders/deliveryman/validate', function(req, res) {
  console.log("/orders/statement/Validate")
  orderController.AcceptDelivery(req,res)
});*/

module.exports = router;
