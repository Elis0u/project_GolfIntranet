import { Router } from 'express';

import {all, one, add, update, remove} from '../../controllers/categoriesevent.js'

const router = Router();

router.get("/", all);
router.get("/:id", one);

router.post("/", add);
router.put("/", update);
router.delete("/", remove);

export default router;