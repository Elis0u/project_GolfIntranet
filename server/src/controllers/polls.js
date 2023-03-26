import { success } from "../helpers/index.js";
import Query from "../model/query.js";

// POLL PART
// Create
export const add_poll = async (req,res) => {
    try {
        const query = "INSERT INTO poll (title, createdAt, suggestionDate, endPoll, user_id) VALUES (?, NOW(), ?, ?, ?)";
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
export const all_poll = async (req, res) => {
    try {
        const query = "SELECT poll.id, title, createdAt, suggestionDate, endPoll, user_id FROM poll";
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

export const one_poll = async (req, res) => {
    try {
        const queryPoll = "SELECT poll.id, title, createdAt, suggestionDate, endPoll, user_id FROM poll WHERE id = ?";
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
export const update_poll = async (req,res) => {
    try {

        const query = "UPDATE poll SET title = ?, suggestionDate = ?, endPoll = ? WHERE id = ?";
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
export const remove_poll = async (req,res) => {
    try {
        const query = "DELETE FROM poll WHERE id = ?";
        const [ result ] = await Query.remove(query, req.body.id);
        
        if(result.affectedRows){
            const msg = "Poll removed";
            res.json(success(msg));

        } else throw Error("Poll couldn't be removed, probably syntax error in object");

    } catch (err) {
        throw Error(err);
    }
}


// VOTE PART
// Create
export const add_vote = async (req,res) => {
    try {
        const query = "INSERT INTO vote (user_id, poll_id, voteOption, createdAt) VALUES (?, ?, ?, NOW())";
        const [result] = await Query.write(query, req.body);

        if(result.affectedRows){
            const msg = "Vote added";
            res.json(success(msg));
        } else throw Error("Vote couldn't be added, probably syntax error in object");

    } catch (err) {
        throw Error(err);
    }
}

// Read
export const all_vote = async (req, res) => {
    try {
        const query = "SELECT vote.id, user_id, poll_id, voteOption, createdAt, updatedAt FROM vote";
        const [votes] = await Query.find(query);
        if(votes.length){
            const msg = "Recovery of all votes";
            res.status(200).json(success(msg, votes));
        } else {
            const msg = "No yet vote in database";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const one_vote = async (req, res) => {
    try {
        const queryVote = "SELECT vote.id, user_id, poll_id, voteOption, createdAt, updatedAt FROM vote WHERE id = ?";
        const vote = await Query.findByValue(queryVote, req.params.val);

        if(!vote.length){
            const msg = "This vote doesn't exist in database";
            res.status(200).json(success(msg));
        } else {
            const msg = "Recovery of vote : " + vote[0].title;
            res.status(200).json(success(msg, vote));
        }
    } catch (err) {
        throw Error(err);
    }
}

// Update
export const update_vote = async (req,res) => {
    try {

        const query = "UPDATE vote SET voteOption = ?, updatedAt = NOW() WHERE id = ?";
        const [result] = await Query.write(query, req.body);

        if(result.affectedRows){
            const msg = "Vote updated";
            res.json(success(msg));

        } else throw Error("Vote couldn't be updated, probably syntax error in object");
        
    } catch (err) {
        throw Error(err);
    }
}

// Delete
export const remove_vote = async (req,res) => {
    try {
        const query = "DELETE FROM vote WHERE id = ?";
        const [ result ] = await Query.remove(query, req.body.id);
        
        if(result.affectedRows){
            const msg = "Vote removed";
            res.json(success(msg));

        } else throw Error("Vote couldn't be removed, probably syntax error in object");

    } catch (err) {
        throw Error(err);
    }
}