import { Router } from 'express';

import { lastActivities, nextEvent, fourEvents } from '../../controllers/home.js'

const router = Router();

router.get("/lastActivities", lastActivities);
router.get("/nextEvent", nextEvent);
router.get("/fourEvents", fourEvents);

export default router;