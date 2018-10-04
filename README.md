# Fast-Food-Fast-API
[![Build Status](https://travis-ci.org/korede360/Fast-Food-Fast-API.svg?branch=staging)](https://travis-ci.org/korede360/Fast-Food-Fast-API) [![codecov](https://codecov.io/gh/korede360/Fast-Food-Fast-API/branch/develop/graph/badge.svg)](https://codecov.io/gh/korede360/Fast-Food-Fast-API)
## Description
Fast-Food-Fast is a service for ordering food.

## Features

### Routes

#### GET /orders
Function: Fetches a list of orders from the database. Can only be carried out by admins.
Sample response:
```json
{
  "success": true,
  "orders": [
    {
      "id": 1,
      "user_id": 2,
      "item": "Frech fries",
      "quantity": 2,
      "status": "Processing"
    },
    {
      "id": 2,
      "user_id": 3,
      "item": "Chicken Burrito",
      "quantity": 3,
      "status": "New"
    }
  ]
}
```

#### POST /orders
Function: Creates a new order, and adds it to the database. Can only be carried out by logged in users.
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
    "user_id": 5,
    "item": "Fried Rice and Chicken",
    "quantity": 3,
    "status": "Cancelled "
  }
}
```

#### GET /orders/:orderId
Function: Gets the order associated with the given id. Can only be carried out by admin.
Sample response:
```json
{
  "success": true,
  "order": {
    "id": 4,
    "user_id": 1,
    "item": "Large Cheeseburger",
    "quantity": 2,
    "status": "Completed"
  }
}
```

#### PUT /orders/:orderId
Function: Updates the status of an order
Sample request:
```json
{
  "status": "Processing"
}
```
Sample response:
```json
{
  "success": true,
  "order": {
    "id": 2,
    "user_id": 6,
    "item": "Chicken wings",
    "quantity": 4,
    "status": "Processing"
  }
}
```

#### GET /menu
Function: Gets the menu
Sample response:
```json
{
  "success": true,
  "menu": [
    {
      "id": 2,
      "name": "Rice and beans",
      "description": "A very nice meal",
      "image_url": "https://example.com/image"
    }
  ]
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
