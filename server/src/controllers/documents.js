import { success } from "../helpers/index.js";
import Query from "../model/query.js";

// Create
export const add_document = async (req, res) => {
    try {
        const query = "INSERT INTO document (title, content, createdAt, category_id, user_id) VALUES (?, ?, NOW(), ?, ?)";
        const [result] = await Query.write(query, req.body);

        if (result.affectedRows) {
            const msg = "Document added.";
            res.status(201).json(success(msg));
        } else {
            const msg = "Document category couldn't be added, probably syntax error in object";
            res.status(400).json({ error: msg });
        }

    } catch (err) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}

// Read
export const all = async (req, res) => {
    try {
        const query = "SELECT document.id, title, content, createdAt, updatedAt, category_id, label, user_id, firstName, lastName FROM document JOIN category_document ON category_id = category_document.id LEFT JOIN user ON user_id = user.id ORDER BY document.createdAt DESC";
        const [documents] = await Query.find(query);
        if (documents.length) {
            const msg = "Recovery of all documents";
            res.status(200).json(success(msg, documents));
        } else {
            const msg = "No yet document in database";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}

// Update
export const update = async (req, res) => {
    try {
        const query = "UPDATE document SET title = ?, content = ?, updatedAt = NOW(), category_id = ? WHERE id = ?";
        const [result] = await Query.write(query, [req.body.title, req.body.content, req.body.categoryId, req.body.id]);

        if (result.affectedRows) {
            const msg = "Document updated";
            res.status(200).json(success(msg));
        } else {
            const msg = "Recovery of document :" + document[0].title;
            res.status(400).json(success(msg, document));
        }
    } catch (err) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
};

// Delete
export const remove = async (req, res) => {
    try {
        const query = "DELETE FROM document WHERE id = ?";
        const [result] = await Query.remove(query, req.body.id);

        if (result.affectedRows) {
            const msg = "Document removed";
            res.status(200).json(success(msg));

        } else {
            const msg = "Recovery of document :" + document[0].title;
            res.status(400).json(success(msg, document));
        }

    } catch (err) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}