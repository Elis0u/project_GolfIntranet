import { Router } from 'express';

import { all, one, add_pelz, update, remove } from '../../controllers/pelz.js'

const router = Router();

router.get("/", all);
router.get("/:val", one);

router.post("/", add_pelz);
router.put("/", update);
router.delete("/", remove);

export default router;