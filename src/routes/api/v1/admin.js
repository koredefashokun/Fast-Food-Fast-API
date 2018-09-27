import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = new Router();

const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const credentials = {
    email: 'admin@fastfoodfast.com',
    password: 'admin123'
  }
  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: 'Please enter your email and password correctly!'
    });
  }
  if (!isValidEmail(email)) {
    res.status(400).json({
      success: false,
      message: 'Please enter a valid email address.'
    });
  }
  if (email !== credentials.email || password !== credentials.password) {
    res.status(400).json({
      success: false,
      message: 'Invalid credentials supplied!'
    });
  } else {
    const token = await jwt.sign(credentials, process.env.SECRET);
    res.status(200).json({
      success: true,
      token
    });
  }
});


export default router;