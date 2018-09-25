process.env.NODE_ENV = 'test';
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../src/app';
import database from '../database';

chai.use(chaiHttp);
const should = chai.should();

describe('Orders', () => {
  describe('GET /api/v1/orders', () => {
    it('Should get all orders', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.orders.should.be.a('array');
          res.body.orders.length.should.be.eql(0);
          done();
        });
    });
  });
  describe('POST /api/v1/orders', () => {
    it('Should create a new order', (done) => {
      const order = {
        item: 'Chicken and Chips',
        quantity: 2
      }
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('Should not create a new order without required fields', (done) => {
      const order = {
        quantity: 2
      }
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.success.should.eql(false);
          done();
        });
    });
  });
  describe('GET /api/v1/orders/:orderId', () => {
    beforeEach((done) => {
      database.orders = [
        {
          id: 1,
          item: 'Pepperoni Pizza',
          quantity: 3,
          completed: false
        }
      ]
      done();
    });
    it('Should get order by specified id', (done) => {
      const order = {
        id: 1
      };
      chai.request(app)
        .get(`/api/v1/orders/${order.id}`)
        .send(order)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.order.should.be.a('object');
          res.body.order.should.have.property('id');
          res.body.order.should.have.property('item').eql('Pepperoni Pizza');
          res.body.order.should.have.property('quantity').eql(3);
          res.body.order.should.have.property('completed');
          done();
        });
    });
  });
  describe('PUT /api/v1/orders/:orderId', () => {
    beforeEach((done) => {
      database.orders = [
        {
          id: 1,
          item: 'Cheeseburger',
          quantity: 2,
          completed: false,
        }
      ];
      done();
    });
    it('Should be able to update order status', (done) => {
      const status = {
        completed: true
      }
      const order = {
        id: 1
      }
      chai.request(app)
        .put(`/api/v1/orders/${order.id}`)
        .send(status)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.order.should.be.a('object');
          res.body.order.should.have.property('item');
          res.body.order.should.have.property('quantity');
          res.body.order.should.have.property('completed').eql(status.completed);
          done();
        });
    });
  });
});