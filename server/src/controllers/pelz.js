import { success } from "../helpers/index.js";
import Query from "../model/query.js";

// Create
export const add_pelz = async (req,res) => {
    try {
        const query = "INSERT INTO pelz (score, createdAt, user_id) VALUES (?, NOW(), ?)";
        const [result] = await Query.write(query, req.body);

        if(result.affectedRows){
            const msg = "Pelz score added";
            res.json(success(msg));
        } else throw Error("Pelz score couldn't be added, probably syntax error in object");

    } catch (err) {
        throw Error(err);
    }
}

// Read
export const allByUser = async (req, res) => {
    try {
        const userId = parseInt(req.query.userId, 10);
        const query = "SELECT pelz.id, score, createdAt FROM pelz WHERE user_id = ? ORDER BY createdAt ASC";
        const [pelzs] = await Query.findByParams(query, [userId]);
        if(pelzs.length){
            const msg = "Récupération de tous les tests pelz";
            res.status(200).json(success(msg, pelzs));
        } else {
            const msg = "Pas encore de test de pelz en BDD";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        throw Error(err);
    }
}
