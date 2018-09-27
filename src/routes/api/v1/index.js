import { Router } from 'express';
import { authMiddleware } from '../../../middleware'
const router = new Router();

import orders from './orders';
import auth from './auth';
import users from './users';
import menu from './menu';
import admin from './admin'

router.use('/orders', orders);
router.use('/auth', auth);
router.use('/menu', menu);
router.use('/users', users);
router.use('/admin', admin)


export default router;