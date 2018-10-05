# Fast-Food-Fast-API
[![Build Status](https://travis-ci.org/korede360/Fast-Food-Fast-API.svg?branch=staging)](https://travis-ci.org/korede360/Fast-Food-Fast-API) [![codecov](https://codecov.io/gh/korede360/Fast-Food-Fast-API/branch/develop/graph/badge.svg)](https://codecov.io/gh/korede360/Fast-Food-Fast-API)
## Description
Fast-Food-Fast is a service for ordering food.

## Features

### API Documentation
The API documentation can be viewed at [this link](https://app.swaggerhub.com/apis/coderinred/Fast-Food-Fast/1.0.0).


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

To run locally, run `npm run dev`

## Tests
  - All tests were written Mocha and Chai
  - Tests can be run by running `npm test` in the terminal

## License
MIT License

## Author
Oluwakorede Fashokun
