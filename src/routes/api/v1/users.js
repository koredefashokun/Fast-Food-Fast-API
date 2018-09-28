import { Router } from 'express';
const router = new Router();

import db from '../../../config/db';

router.get('/:userId/orders', async (req, res) => {
  const { userId } = req.params;
  const query = 'SELECT * FROM orders WHERE user_id = $1';
  try {
    const { rows: orders } = await db.query(query, [userId]);
    if (!orders) {
      res.status(404).json({
        success: false,
        message: 'Orders not found in database.'
      });
    }
    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occured while attempting to fetch orders.',
      error
    })
  }
})

export default router;