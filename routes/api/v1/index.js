import { Router } from 'express';

const router = new Router();

import orders from './orders';

router.use('/orders', orders);

export default router;