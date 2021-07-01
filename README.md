# API Orders
> 
This API of the Ceseat API suite allows to manage the creation, the modification of the status, the visualization and the deletion of the orders (9 routes)
**port : 3003**

### POST /orders/order
> create new order

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : {
    "userId": "20",
    "restaurantId": "124",
    "price" : "26"
}
**params** : INT **userId**
#### Out
**exit** :  STRING **"order created"**

------------
### GET /orders/user/:userId
> Get user orders

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **userId**
#### Out
**exit** : 
{
	"number":109,
	"restaurantName":"MC 2 3",
	"status":"pendingDelivery",
	"comment":"comment pendingRealization",
	"price":1.5,
	"date":"2021-06-28T00:00:00+02:00",
	"Articles":[{"name":"Potatoes","quantity":1,"Price":4.000000000000000e+000}],
	"Menu":[{"name":"Menu potatoes","quantity":1,"Price":7}]
}


------------

### GET /orders/deliveryman/:deliveryManId
> Get deliveryman orders

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **deliveryManId**
#### Out
**exit** : 
[
{
"deliveryManId":3,
"restaurantName":"MC 2 3",
"number":112,"comment":"comment delivery",
"restaurantPhone":"0245565757",
"restaurantAddress":
[
{
"contry":"France",
"city":"Strasbourg",
"address":"20 rue des sauccisse",
"zipCode":67200}],
"clientAddress":
[
{
"contry":"France",
"city":"Munchhouse",
"address":"20 rue des marchands",
"zipCode":58785
}
],
"clientName":"Romain KAUFFMANN",
"clientPhone":"0789837112",
"status":"delivery"
}
]

------------

### GET /orders/restaurant/history/:restaurantId
> Get delivered orders

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **restaurantId**
#### Out
**exit** : 

------------

### GET /orders/restaurant/current/:restaurantId
> Get restaurant no delivered or no denied orders

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **restaurantId**
#### Out
**exit** : 
[
{
"number":99,
"clientName":"Guillaume Doignon",
"status":"pendingValidation",
"price":3,
"articles":
[
{
"name":"kebab",
"quantity":6,
"price":3
},
{
"name":"coca",
"quantity":4,
"price":4
}
],
"menus":
[
{
"name":"Menu kebab",
"quantity":3,
"price":21
}
]

------------

### DELETE /orders/user/:orderId
> Delete user orders

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **orderId**
#### Out
**exit** :  STRING **"deleted"**

------------

### DELETE /orders/restaurant/:orderId
> Delete restaurant orders

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **orderId**
#### Out
**exit** :  STRING **"deleted"**

------------

### PUT /orders/statement/validate/:id
> validate order

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **id**
#### Out
**exit** :  STRING **"order validate"**

------------

### PUT /orders/statement/update/:id
> modify order statement

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **id**
#### Out
**exit** :  STRING **"statement modified**

------------

