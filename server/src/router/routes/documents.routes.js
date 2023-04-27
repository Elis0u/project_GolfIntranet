import { Router } from 'express';

import { all, add_document, update, remove } from '../../controllers/documents.js'

const router = Router();

router.get("/", all);

router.post("/", add_document);

router.put("/", update);

router.delete("/", remove);

export default router;