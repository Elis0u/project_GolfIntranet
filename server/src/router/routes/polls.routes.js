import { Router } from 'express';

import { all, one, add_poll, update, remove } from '../../controllers/polls.js'

const router = Router();

router.get("/", all);
router.get("/:val", one);

router.post("/", add_poll);
router.put("/", update);
router.delete("/", remove);

export default router;