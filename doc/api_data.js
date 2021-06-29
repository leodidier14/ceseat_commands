define({ "api": [
  {
    "type": "get",
    "url": "/orders/user/:userId",
    "title": "get user orders information",
    "name": "getUsersOrders",
    "parameter": {
      "fields": {
        "Order": [
          {
            "group": "Order",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "group": "D:\\Code\\Node JS\\Projet\\ceaseat_commands\\ceseat_commands\\routes\\routes.js",
    "groupTitle": "D:\\Code\\Node JS\\Projet\\ceaseat_commands\\ceseat_commands\\routes\\routes.js"
  },
  {
    "name": "Orders",
    "group": "Statement",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "Statement"
  }
] });
