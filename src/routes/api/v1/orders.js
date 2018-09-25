import { Router } from 'express';

const router = new Router();
import database from '../../../../database';
import db from '../../../config/db';

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }

  return false;
}

router.get('/', async (req, res) => {
  // let orders = [];
  // const query = await db.query('SELECT * FROM orders ORDER BY order_id ASC');
  // await query.on('row', async order => {
  //   await orders.push(order);
  // });
  // res.status(200).json({
  //   success: true,
  //   orders
  // });
  const orders = await database.orders;
  if (!orders) {
    res.status(400).json({
      success: false,
      message: 'Unable to fetch orders.'
    });
  } else {
    res.status(200).json({
      success: true,
      orders
    });
  }
});

router.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const order = await database.orders.find(
    function (obj) {
      if (obj.id == orderId) {
        return obj;
      }
    }
  );
  if (order) {
    res.status(200).json({
      success: true,
      order
    })
  } else {
    res.status(404).json({
      success: false,
      message: 'Order not found!'
    });
  }
});

router.post('/', (req, res) => {
  const { item, quantity } = req.body;
  if (!item || !quantity) {
    res.status(500).json({
      success: false,
      message: 'Please fill out all required fields!'
    });
    return;
  }
  const id = database.orders.length + 1;
  const payload = {
    id,
    item,
    quantity,
    completed: false
  };
  database.orders.push(payload);
  if (containsObject(payload, database.orders)) {
    res.status(200).json({
      success: true,
      message: 'Order successfully added!',
      order: payload
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Order not added to the database!'
    });
  }
});

router.put('/:orderId', (req, res) => {
  const { orderId } = req.params;
  var { completed } = req.body;
  // If 'true' is entered as a string, make it a boolean!
  completed = JSON.parse(completed);
  var order = database.orders.find(
    function (obj) {
      if (obj.id == orderId) {
        return obj;
      }
    }
  );
  if (order) {
    order.completed = completed;
    res.json({
      success: true,
      order
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Order not found!'
    });
  }
});

export default router;