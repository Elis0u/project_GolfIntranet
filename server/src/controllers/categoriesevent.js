import { success } from "../helpers/index.js";
import Query from "../model/query.js";

// Create
export const add = async (req,res) => {
    try {
        const query = "INSERT INTO categoryevent (label) VALUES (?)";
        const [result] = await Query.write(query, req.body);
        
        if(result.affectedRows){
            const msg = "Event category added";
            res.json(success(msg, result));
        } else throw Error("Event category couldn't be added, probably syntax error in object");
        
    } catch (err) {
        throw Error(err);
    }
}

// Read
export const all = async (req, res) => {
    try {
        const query = "SELECT categoryevent.id, label FROM categoryevent";
        const [categories] = await Query.find(query);

        if(categories.length){
            const msg = "Recovery of all event categories";
            res.status(200).json(success(msg, categories));
        } else {
            const msg = "No yet event category on database";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const one = async (req, res) => {
    try {
        const query = "SELECT categoryevent.id, label FROM categoryevent WHERE id = ?";
        const category = await Query.findOne(query, req.params.id);
        
        if(!category.length){
            const msg = "This event category does not exist in database";
            res.status(200).json(success(msg));
        } else {
            const msg = "Recovery of event category : " + categoryevent[0].label;
            res.status(200).json(success(msg, category));
        }
    } catch (err) {
        throw Error(err);
    }
}

// Update
export const update = async (req,res) => {
    try {
        const query = "UPDATE categoryevent SET label = ? WHERE id = ?";
        const [result] = await Query.write(query, req.body);

        if(result.affectedRows){
            const msg = "Event category updated";
            res.json(success(msg));

        } else throw Error("Event category couldn't be updated, probably syntax error in object");
        
    } catch (err) {
        throw Error(err);
    }
}

// Delete
export const remove = async (req,res) => {
    try {
        const query = "DELETE FROM categoryevent WHERE id = ?";
        const [ result ] = await Query.remove(query, req.body.id);
        
        if(result.affectedRows){
            const msg = "Event category removed";
            res.json(success(msg));

        } else throw Error("Event category couldn't be removed, probably syntax error in object");

    } catch (err) {
        throw Error(err);
    }
}