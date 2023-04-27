import { Router } from "express";

import documents_routes from "./routes/documents.routes.js";
import categoriesDocument_routes from "./routes/categoriesDocument.routes.js";
import events_routes from "./routes/events.routes.js";
import categoriesEvent_routes from "./routes/categoriesEvent.routes.js";
import pelz_routes from "./routes/pelz.routes.js";
import users_routes from "./routes/users.routes.js";
import home_routes from "./routes/home.routes.js";

const router = Router();

router.use("/documents", documents_routes);
router.use("/categoriesDocument", categoriesDocument_routes);

router.use("/events", events_routes);
router.use("/categoriesEvent", categoriesEvent_routes);

router.use("/pelz", pelz_routes);

router.use("/user", users_routes);

router.use("/home", home_routes);

export default router;
