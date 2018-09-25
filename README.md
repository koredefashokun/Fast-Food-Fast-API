# Fast-Food-Fast-API
[![Build Status](https://travis-ci.org/korede360/Fast-Food-Fast-API.svg?branch=staging)](https://travis-ci.org/korede360/Fast-Food-Fast-API) [![Coverage Status](https://coveralls.io/repos/github/korede360/Fast-Food-Fast-API/badge.svg?branch=master)](https://coveralls.io/github/korede360/Fast-Food-Fast-API?branch=master) [![codecov](https://codecov.io/gh/korede360/Fast-Food-Fast-API/branch/master/graph/badge.svg)](https://codecov.io/gh/korede360/Fast-Food-Fast-API)
## Description
API for Fast-Food-Fast, a service for ordering food.

## Routes
### v1

#### GET /orders
Function: Fetches a list of orders from the database.
Sample response:
```json
{
  "success": true,
  "orders": [
    {
      "id": 1,
      "item": "Frech fries",
      "quantity": 2,
      "completed": true
    },
    {
      "id": 2,
      "item": "Chicken Burrito",
      "quantity": 3,
      "completed": false
    }
  ]
}
```

#### POST /orders
Function: Creates a new order, and adds it to the database.
Sample request:
```json
{
  "item": "Fried Rice and Chicken",
  "quantity": 3
}
```
Sample response:
```json
{
  "success": true,
  "order": {
    "id": 1,
    "item": "Fried Rice and Chicken",
    "quantity": 3,
    "completed": false
  }
}
```

#### GET /orders/:orderId
Function: Gets the order associated with the given id.
Sample response:
```json
{
  "success": true,
  "order": {
    "id": 4,
    "item": "Large Cheeseburger",
    "quantity": 2,
    "completed": true
  }
}
```

#### PUT /orders/:orderId
Function: Updates the status of an order
Sample request:
```json
{
  "completed": true
}
```
Sample response:
```json
{
  "success": true,
  "order": {
    "id": 2,
    "item": "Chicken wings",
    "quantity": 4,
    "completed": true
  }
}
```

## License
MIT License

## Author
Oluwakorede Fashokun