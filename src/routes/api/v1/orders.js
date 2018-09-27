import { Router } from 'express';
import moment from 'moment';

const router = new Router();
import db from '../../../config/db';

import { adminMiddleware, authMiddleware } from '../../../middleware';

router.get('/', adminMiddleware, async (req, res) => {
  const query = 'SELECT * FROM orders';
  try {
    const { rows: orders } = await db.query(query);
    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to fetch your orders.',
      error
    });
  }
});

router.get('/:orderId', adminMiddleware, async (req, res) => {
  const { orderId } = req.params;
  const text = 'SELECT * FROM orders WHERE id = $1';
  try {
    const { rows } = await db.query(text, [orderId]);
    if (!rows[0]) {
      res.status(404).json({
        success: false,
        message: 'Order not found in database.'
      });
    }
    res.status(200).json({
      success: true,
      order: rows[0]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'An error occured while fetching orders.'
    });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { id } = req.decoded;
  const { item, quantity } = req.body;
  if (!item || !quantity) {
    res.status(400).json({
      success: false,
      message: 'Please fill out all required fields!'
    });
    return;
  }
  const query = `INSERT INTO orders(user_id, item, quantity, status, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) returning *`;
  const values = [
    id,
    item,
    quantity,
    'New',
    moment(new Date()),
    moment(new Date())
  ];
  try {
    const { rows } = await db.query(query, values);
    res.status(201).json({
      success: true,
      order: rows[0]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to add order.',
      error
    });
  }
});

router.put('/:orderId', adminMiddleware, async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const statusArray = ['New', 'Processing', 'Cancelled', 'Complete']
  if (!statusArray.includes(status)) {
    res.status(400).json({
      success: false,
      message: 'Please carry out a valid action!'
    });
  }
  const findQuery = 'SELECT * FROM orders WHERE id=$1';
  const updateQuery = `UPDATE orders SET status=$1 WHERE id=$2 returning *`;
  try {
    const { rows } = await db.query(findQuery, [orderId]);
    if (!rows[0]) {
      res.status(404).json({
        success: false,
        message: 'Order does not exist!'
      });
    }
    const values = [status, orderId];
    const response = await db.query(updateQuery, values);
    res.status(200).json({
      success: true,
      order: response.rows[0]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    });
  }
});

export default router;