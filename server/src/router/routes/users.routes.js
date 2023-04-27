import { Router } from 'express';

import {checkToken, all, activitiesUser, signup, signin, update_isConfirmed, update_isAdmin, update_user, update_avatar, remove_user } from '../../controllers/users.js';
import { auth } from '../../middlewares/auth.js';
import upload from '../../middlewares/multerConfig.js';
import { multerErrorHandler } from '../../middlewares/multerErrorHandler.js';

const router = Router();

router.get("/", all);
router.get("/checkToken", auth, checkToken);
router.get("/activities_user", activitiesUser);

router.post("/signup", signup);
router.post("/signin", signin);


router.put("/update_isConfirmed", update_isConfirmed);
router.put("/update_isAdmin", update_isAdmin);
router.put("/update_user", update_user);
router.put("/update_avatar", auth, upload.single('avatar'), multerErrorHandler, update_avatar);

router.delete("/", remove_user);


export default router;