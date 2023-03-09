import { Router } from 'express';

import { all, one, add_event, update, remove } from '../../controllers/events.js'

const router = Router();

router.get("/", all);
router.get("/:val", one);

router.post("/", add_event);
router.put("/", update);
router.delete("/", remove);

export default router;