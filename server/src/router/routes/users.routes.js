import { Router } from 'express';

import {checkToken, all, signup, signin, update_isConfirmed} from '../../controllers/users.js';
import { auth } from '../../middlewares/auth.js';


const router = Router();

router.get("/", all);
router.get("/checkToken", auth, checkToken);
// router.get("/:id", one);

router.post("/signup", signup);
router.post("/signin", signin);

router.put("/update_isConfirmed", update_isConfirmed);

// router.delete("/", remove);


export default router;