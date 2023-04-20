import { Router } from 'express';

import { allByUser, add_pelz, update, remove } from '../../controllers/pelz.js'

const router = Router();

router.get("/allPelzScoreByUser", allByUser);

router.post("/", add_pelz);
router.put("/", update);
router.delete("/", remove);

export default router;