process.env.NODE_ENV = 'test';
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../src/app';

chai.use(chaiHttp);
const should = chai.should();

describe('Orders', () => {

  describe('GET /api/v1/orders', () => {
    let token;

    beforeEach((done) => {
      chai.request(app)
        .post('/api/v1/admin/login')
        .send({
          email: 'admin@fastfoodfast.com',
          password: 'admin123'
        })
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it('Should get all orders', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .set('Authorization', `Admin ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.orders.should.be.a('array');
          done();
        });
    });

  });

  describe('POST /api/v1/orders', () => {

    let token;
    beforeEach((done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'Tester',
          email: 'tester@example.com',
          password: 'testing123',
          confirmPassword: 'testing123'
        })
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it('Should create a new order', (done) => {
      const order = {
        item: 'Chicken and Chips',
        quantity: 2
      }
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
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

    let adminToken;
    let userToken;
    let id;

    before((done) => {
      chai.request(app)
        .post('/api/v1/admin/login')
        .send({
          email: 'admin@fastfoodfast.com',
          password: 'admin123'
        })
        .end((err, res) => {
          adminToken = res.body.token;
          done();
        });
    });

    before((done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'Tester',
          email: 'tester@example.com',
          password: 'testing123',
          confirmPassword: 'testing123'
        })
        .end((err, res) => {
          userToken = res.body.token;
          done();
        });
    })

    before((done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          item: 'Rice',
          quantity: 3
        })
        .end((err, res) => {
          id = res.body.order.id;
          done();
        })
    })

    it('Should get order by specified id', (done) => {
      chai.request(app)
        .get(`/api/v1/orders/${id}`)
        .set('Authorization', `Admin ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.order.should.be.a('object');
          res.body.order.should.have.property('id');
          res.body.order.should.have.property('item').eql('Rice');
          res.body.order.should.have.property('quantity').eql(3);
          res.body.order.should.have.property('status').eql('New');
          done();
        });
    });
  });

  describe('PUT /api/v1/orders/:orderId', () => {

    let adminToken;
    let userToken;
    let id;

    before((done) => {
      chai.request(app)
        .post('/api/v1/admin/login')
        .send({
          email: 'admin@fastfoodfast.com',
          password: 'admin123'
        })
        .end((err, res) => {
          adminToken = res.body.token;
          done();
        });
    });

    before((done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'Tester',
          email: 'tester@example.com',
          password: 'testing123',
          confirmPassword: 'testing123'
        })
        .end((err, res) => {
          userToken = res.body.token;
          done();
        });
    })

    before((done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          item: 'Rice',
          quantity: 3
        })
        .end((err, res) => {
          id = res.body.order.id;
          done();
        })
    })

    it('Should be able to update order status', (done) => {
      chai.request(app)
        .put(`/api/v1/orders/${id}`)
        .set('Authorization', `Admin ${adminToken}`)
        .send({ status: 'Processing' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.order.should.be.a('object');
          res.body.order.should.have.property('item');
          res.body.order.should.have.property('quantity');
          res.body.order.should.have.property('status').eql('Processing');
          done();
        });
    });

  });
  describe('POST /api/v1/auth/signup', () => {

    it('Should create a user with provided credentials', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'Mr. Test',
          email: 'testing123@gmail.com',
          password: 'test123',
          confirmPassword: 'test123'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.a.property('success').eql(true);
          res.body.token.should.be.a('string');
          done();
        })
    });

    it('Should not create a user without correct credentials', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'testing123@gmail.com',
          confirmPassword: 'test123'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.a.property('success').eql(false);
          done();
        })
    });

  });
  describe('POST /api/v1/auth/login', () => {

    it('Should log in a user with correct credentials', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'testing123@gmail.com',
          password: 'test123'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.a.property('success').eql(true);
          res.body.token.should.be.a('string');
          done();
        })
    });

    it('Should not log in a user without required credentials', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'testing123@gmail.com'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.a.property('success').eql(false);
          done();
        })
    });

  });

  describe('GET /api/v1/menu', () => {

    let adminToken;

    before((done) => {
      chai.request(app)
        .post('/api/v1/admin/login')
        .send({
          email: 'admin@fastfoodfast.com',
          password: 'admin123'
        })
        .end((err, res) => {
          adminToken = res.body.token;
          done();
        });
    })

    it('Should create a new menu item', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .set('Authorization', `Admin ${adminToken}`)
        .send({
          name: 'Rice',
          description: 'Lorem ipsum dolor sit amet.',
          imageUrl: 'https://facebook.com'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.a.property('success').eql(true);
          res.body.should.have.a.property('item');
          res.body.item.should.have.a.property('name').eql('Rice');
          res.body.item.should.have.a.property('description').eql('Lorem ipsum dolor sit amet.');
          res.body.item.should.have.a.property('image_url').eql('https://facebook.com');
          done();
        })
    })

    it('Should get the items on the menu', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.a.property('success').eql(true);
          res.body.should.have.a.property('menu');
          res.body.menu.should.be.a('array');
          done();
        })
    });

  })

  describe('GET /api/v1/users/:userId/orders', () => {

    let token;
    let id;

    before((done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'Mr. Do Good',
          email: 'tester@example.com',
          password: 'testing123',
          confirmPassword: 'testing123'
        })
        .end((err, res) => {
          token = res.body.token;
          id = res.body.id;
          done();
        });
    });

    before((done) => {
      const order = {
        item: 'Chicken and Chips',
        quantity: 2
      }
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    })

    it('Should get the orders made by the specified user', (done) => {
      chai.request(app)
        .get(`/api/v1/users/${id}/orders`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.a.property('success').eql(true);
          res.body.orders.should.be.a('array');
          done();
        });
    })
  })
});