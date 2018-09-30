import { Router } from 'express';
import { adminMiddleware } from '../../../middleware';

import db from '../../../config/db';

const router = new Router();

router.post('/', adminMiddleware, async (req, res) => {
  const { name, description, imageUrl } = req.body;
  if (!name || typeof name !== 'string') {
    res.status(400).json({
      success: false,
      message: 'Please enter the meal name correctly! (Hint: name must be a string)'
    });
  } else if (!description || typeof name !== 'string') {
    res.status(400).json({
      success: false,
      message: 'Please enter the meal description correctly! (Hint: description must be a string)'
    });
  } else if (!imageUrl || typeof imageUrl !== 'string') {
    res.status(400).json({
      success: false,
      message: 'Please enter the meal\'s image URL correctly! (Hint: imageUrl must be a string)'
    });
  }
  const createQuery = `INSERT INTO menu (name, description, image_url) VALUES($1, $2, $3) returning * `;
  const values = [
    name,
    description,
    imageUrl
  ];
  try {
    const { rows } = await db.query(createQuery, values);
    res.status(201).json({
      success: true,
      item: rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occured while attempting to add item to menu',
      error
    });
  }
});

router.get('/', async (req, res) => {
  const query = 'SELECT * FROM menu';
  try {
    const { rows: menu } = await db.query(query);
    res.status(200).json({
      success: true,
      menu
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occured while attempting to fetch the menu.',
      error
    });
  }
});

export default router;