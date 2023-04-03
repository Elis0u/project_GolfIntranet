import { success } from "../helpers/index.js";
import Query from "../model/query.js";

// Create
export const add_event = async (req,res) => {
    try {
        const query = "INSERT INTO event (title, location, startEvent, endEvent, createdAt, category_id, user_id) VALUES (?, ?, ?, ?, NOW(), ?, ?)";
        const [result] = await Query.write(query, req.body);

        if(result.affectedRows){
            const msg = "Event added";
            res.json(success(msg));
        } else throw Error("Event couldn't be added, probably syntax error in object");

    } catch (err) {
        throw Error(err);
    }
}

// Read
export const all = async (req, res) => {
    try {
        const query = "SELECT event.id, title, location, startEvent, endEvent, createdAt, category_id, user_id FROM event";
        const [events] = await Query.find(query);
        if(events.length){
            const msg = "Recovery of all events";
            res.status(200).json(success(msg, events));
        } else {
            const msg = "No yet event in database";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const one = async (req, res) => {
    try {
        const queryEvent = "SELECT event.id, title, location, startEvent, endEvent, createdAt, category_id FROM event WHERE id = ?";
        const event = await Query.findByValue(queryEvent, req.params.val);

        if(!event.length){
            const msg = "This event doesn't exist in databse";
            res.status(200).json(success(msg));
        } else {
            const msg = "Recovery of event : " + event[0].title;
            res.status(200).json(success(msg, event));
        }
    } catch (err) {
        throw Error(err);
    }
}

// Update
export const update = async (req,res) => {
    try {
        const query = "UPDATE event SET title = ?, location = ?, startEvent = ?, endEvent = ?, category_id = ? WHERE id = ?";
        const [result] = await Query.write(query, [req.body.title, req.body.location, req.body.startEvent, req.body.endEvent, req.body.categoryId, req.body.id]);

        if(result.affectedRows){
            const msg = "Event updated";
            res.json(success(msg));

        } else throw Error("Event couldn't be updated, probably syntax error in object");
        
    } catch (err) {
        throw Error(err);
    }
}

// Delete
export const remove = async (req,res) => {
    try {
        const query = "DELETE FROM event WHERE id = ?";
        const [ result ] = await Query.remove(query, req.body.id);
        
        if(result.affectedRows){
            const msg = "Event removed";
            res.json(success(msg));

        } else throw Error("Event couldn't be removed, probably syntax error in object");

    } catch (err) {
        throw Error(err);
    }
}