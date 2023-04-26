import { Router } from 'express';

import { lastActivities, nextEvent, fourEvents, weather } from '../../controllers/home.js'

const router = Router();

router.get("/lastActivities", lastActivities);
router.get("/nextEvent", nextEvent);
router.get("/fourEvents", fourEvents);
router.get("/weather", weather);

export default router;