import { Router } from 'express';

import { lastActivities } from '../../controllers/home.js'

const router = Router();

router.get("/lastActivities", lastActivities);

export default router;