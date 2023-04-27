import { Router } from 'express';

import { allByUser, add_pelz } from '../../controllers/pelz.js'

const router = Router();

router.get("/allPelzScoreByUser", allByUser);

router.post("/", add_pelz);


export default router;