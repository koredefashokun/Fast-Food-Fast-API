# Fast-Food-Fast-API
[![Build Status](https://travis-ci.org/korede360/Fast-Food-Fast-API.svg?branch=staging)](https://travis-ci.org/korede360/Fast-Food-Fast-API) [![codecov](https://codecov.io/gh/korede360/Fast-Food-Fast-API/branch/master/graph/badge.svg)](https://codecov.io/gh/korede360/Fast-Food-Fast-API)
## Description
Fast-Food-Fast is a service for ordering food.

## Features

### Routes

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

## Installation and Setup
To install the app simply run:
```sh
git clone https://github.com/korede360/Fast-Food-Fast-API.git
cd Fast-Food-Fast-API
npm install
```
Then, create a .env file in the root of your project, with the following details:
```
DATABASE_URL='url/to/postgres/database'
```
Where '/url/to/postgres/database' is replaced with the actual URL to your PostgresQL database.
## Tests
  - All tests were written Mocha and Chai
  - Tests can be run by running `npm test` in the terminal

## License
MIT License

## Author
Oluwakorede Fashokun