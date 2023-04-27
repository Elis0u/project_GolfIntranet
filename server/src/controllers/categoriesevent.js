import { success } from "../helpers/index.js";
import Query from "../model/query.js";

// Create
export const add = async (req, res) => {
    try {
        const query = "INSERT INTO category_event (label) VALUES (?)";
        const [result] = await Query.write(query, req.body);

        if (result.affectedRows) {
            const msg = "Event category added";
            res.status(201).json(success(msg, result));
        } else {
            const msg = "Event category couldn't be added, probably syntax error in object";
            res.status(400).json({ error: msg });
        }

    } catch (err) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}

// Read
export const all = async (req, res) => {
    try {
        const query = "SELECT category_event.id, label FROM category_event";
        const [categories] = await Query.find(query);

        if (categories.length) {
            const msg = "Recovery of all event categories";
            res.status(200).json(success(msg, categories));
        } else {
            const msg = "No yet event category on database";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}

// Update
export const update = async (req, res) => {
    try {
        const query = "UPDATE category_event SET label = ? WHERE id = ?";
        const [result] = await Query.write(query, req.body);

        if (result.affectedRows) {
            const msg = "Event category updated";
            res.status(200).json(success(msg));

        } else {
            const msg = "Event category couldn't be updated, probably syntax error in object";
            res.status(400).json({ error: msg });
        }

    } catch (err) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}

// Delete
export const remove = async (req, res) => {
    try {
        const query = "DELETE FROM category_event WHERE id = ?";
        const [result] = await Query.remove(query, req.body.id);

        if (result.affectedRows) {
            const msg = "Event category removed";
            res.status(200).json(success(msg));

        } else {
            const msg = "Event category couldn't be removed, probably syntax error in object";
            res.status(400).json({ error: msg });
        }

    } catch (err) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}