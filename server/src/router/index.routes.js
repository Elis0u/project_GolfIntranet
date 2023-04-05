import { Router } from "express";

import documents_routes from "./routes/documents.routes.js";
import categoriesdocument_routes from "./routes/categoriesdocument.routes.js";
import polls_routes from "./routes/polls.routes.js";
import events_routes from "./routes/events.routes.js";
import categoriesevent_routes from "./routes/categoriesevent.routes.js";
import pelz_routes from "./routes/pelz.routes.js";
import users_routes from "./routes/users.routes.js";
import home_routes from "./routes/home.routes.js";
import { isAdmin } from '../middlewares/admin.js';

const router = Router();

router.use("/documents", documents_routes);
router.use("/categoriesdocument", categoriesdocument_routes);

router.use("/polls", polls_routes);

router.use("/events", events_routes);
router.use("/categoriesevent", categoriesevent_routes);

router.use("/pelz", pelz_routes);

router.use("/user", users_routes);

router.use("/home", home_routes);

export default router;
