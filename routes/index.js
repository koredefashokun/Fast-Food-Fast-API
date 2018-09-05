import { Router } from 'express';

const router = new Router();

import api from './api';

router.use('/api', api)

export default router;