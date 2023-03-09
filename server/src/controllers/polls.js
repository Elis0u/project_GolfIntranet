import { success } from "../helpers/index.js";
import Query from "../model/query.js";

// Create
export const add_poll = async (req,res) => {
    try {
        const query = "INSERT INTO poll (title, suggestionDate, endPoll, isFinished, createdAt, user_id) VALUES (?, ?, ?, 0, NOW(), ?)";
        const [result] = await Query.write(query, req.body);

        if(result.affectedRows){
            const msg = "Poll added";
            res.json(success(msg));
        } else throw Error("Poll couldn't be added, probably syntax error in object");

    } catch (err) {
        throw Error(err);
    }
}

// Read
export const all = async (req, res) => {
    try {
        const query = "SELECT poll.id, title, suggestionDate, endPoll, isFinished, createdAt, user_id FROM poll";
        const [polls] = await Query.find(query);
        if(polls.length){
            const msg = "Recovery of all polls";
            res.status(200).json(success(msg, polls));
        } else {
            const msg = "No yet poll in database";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const one = async (req, res) => {
    try {
        const queryPoll = "SELECT poll.id, title, suggestionDate, endPoll, isFinished, createdAt, user_id FROM poll WHERE id = ?";
        const poll = await Query.findByValue(queryPoll, req.params.val);

        if(!poll.length){
            const msg = "This poll doesn't exist in database";
            res.status(200).json(success(msg));
        } else {
            const msg = "Recovery of poll : " + poll[0].title;
            res.status(200).json(success(msg, poll));
        }
    } catch (err) {
        throw Error(err);
    }
}

// Update
export const update = async (req,res) => {
    try {

        const query = "UPDATE poll SET title = ?, suggestionDate = ?, endPoll = ?, isFinished = 0 WHERE id = ?";
        const [result] = await Query.write(query, req.body);

        if(result.affectedRows){
            const msg = "Poll updated";
            res.json(success(msg));

        } else throw Error("Poll couldn't be updated, probably syntax error in object");
        
    } catch (err) {
        throw Error(err);
    }
}

// Delete
export const remove = async (req,res) => {
    try {
        const query = "DELETE FROM poll WHERE id = ?";
        const result = await Query.remove(query, req.body.id);
        
        if(result.affectedRows){
            const msg = "Poll removed";
            res.json(success(msg));

        } else throw Error("Poll couldn't be removed, probably syntax error in object");

    } catch (err) {
        throw Error(err);
    }
}