import { Router } from 'express';

import { all_poll, one_poll, add_poll, update_poll, remove_poll } from '../../controllers/polls.js'

const router = Router();

router.get("/", all_poll);
router.get("/:val", one_poll);

router.post("/", add_poll);
router.put("/", update_poll);
router.delete("/", remove_poll);

export default router;