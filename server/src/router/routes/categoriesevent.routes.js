import { Router } from 'express';

import {all, add, update, remove} from '../../controllers/categoriesEvent.js'

const router = Router();

router.get("/", all);

router.post("/", add);

router.put("/", update);

router.delete("/", remove);

export default router;