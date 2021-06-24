var express = require('express');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
var router = express.Router();



const orderController = require('../controllers/ordersController.js')


// OrdersHistory for userid
router.get('/orders/user/:userId', function(req, res) {
  console.log("Request on /orders/user/:userId")
  orderController.getUsersOrders(req,res);
})
// OrderHistory for restaurant
router.get('/orders/restaurant/:restaurantId', function(req, res) {
  console.log("Request on /orders/restaurant/:restaurantId")
  orderController.getRestaurantOrders(req,res)
});

// add new order
router.post('/order/neworder', function(req, res) {
  console.log("Request on /order")
  orderController.addOrder(req,res)
});

// add new order
router.delete('/order/user/:orderId', function(req, res) {
  console.log("Request on /order whit :" + req.params.orderId)
  orderController.deleteUsersOrders(req,res)
});

// add new order
router.delete('/order/restaurant/:orderId', function(req, res) {
  console.log("Request on /order whit :" + req.params.orderId)
  orderController.deleteRestaurantOrders(req,res)
});

module.exports = router;
