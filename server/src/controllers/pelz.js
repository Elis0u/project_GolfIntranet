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

export const one = async (req, res) => {
    try {
        const queryPelz = "SELECT * FROM pelz WHERE id = ?";
        const pelz = await Query.findByValue(queryPelz, req.params.val);

        if(!pelz.length){
            const msg = "This score pelz doen't exist in database";
            res.status(200).json(success(msg));
        } else {
            const msg = "Recovery of test pelz :" + pelz[0].score;
            res.status(200).json(success(msg, pelz));
        }
    } catch (err) {
        throw Error(err);
    }
}

// Update
export const update = async (req,res) => {
    try {

        const query = "UPDATE pelz SET score = ? WHERE id = ?";
        const [result] = await Query.write(query, req.body);

        if(result.affectedRows){
            const msg = "Pelz score updated";
            res.json(success(msg));

        } else throw Error("Pelz score couldn't be updated, probably syntax error in object");
        
    } catch (err) {
        throw Error(err);
    }
}

// Delete
export const remove = async (req,res) => {
    try {
        const query = "DELETE FROM pelz WHERE id = ?";
        const [ result ] = await Query.remove(query, req.body.id);
        
        if(result.affectedRows){
            const msg = "Pelz score removed";
            res.json(success(msg));

        } else throw Error("Pelz score couldn't be removed, probably syntax error in object");

    } catch (err) {
        throw Error(err);
    }
}