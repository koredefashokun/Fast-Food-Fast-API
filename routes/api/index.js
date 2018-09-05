import { Router } from 'express';

const router = new Router();

import v1 from './v1';

router.use('/v1', v1);

export default router;