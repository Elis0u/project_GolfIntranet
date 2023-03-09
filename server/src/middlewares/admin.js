import { success } from "../helpers/index.js";

export const isAdmin = (req, res, next) => {
    try {
        if (req.user && req.user.isAdmin) {
        next();
        } else {
            const msg = "Vous devez être admin pour accéder à cette route";
            res.status(403).json(success(msg));
        }
    } catch (error) {
        throw Error(error);
  }
}