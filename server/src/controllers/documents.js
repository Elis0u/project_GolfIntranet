import { success } from "../helpers/index.js";
import Query from "../model/query.js";

// Create
export const add_document = async (req,res) => {
    try {
        const query = "INSERT INTO document (title, content, createdAt, category_id, user_id) VALUES (?, ?, NOW(), ?, ?)";
        const [result] = await Query.write(query, req.body);

        if(result.affectedRows){
            const msg = "Document added.";
            res.json(success(msg));
        } else throw Error("Document couldn't be added, probably syntax error in object");

    } catch (err) {
        throw Error(err);
    }
}

// Read
export const all = async (req, res) => {
    try {
        const query = "SELECT document.id, title, content, createdAt, updatedAt, category_id, user_id FROM document";
        const [documents] = await Query.find(query);
        if(documents.length){
            const msg = "Recovery of all documents";
            res.status(200).json(success(msg, documents));
        } else {
            const msg = "No yet document in database";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const one = async (req, res) => {
    try {
        const queryDocument = "SELECT document.id, title, content, createdAt, updatedAt, category_id, user_id FROM document WHERE id = ?";
        const document = await Query.findByValue(queryDocument, req.params.val);
        console.log("Document --> : ", document);

        if(!document.length){
            const msg = "This document doesn't exist in database";
            res.status(200).json(success(msg));
        } else {
            const msg = "Recovery of document :" + document[0].title;
            res.status(200).json(success(msg, document));
        }
    } catch (err) {
        throw Error(err);
    }
}

// Update
export const update = async (req,res) => {
    try {
        const query = "UPDATE document SET title = ?, content = ?, updatedAt = NOW(), category_id = ? WHERE id = ?";
        const [result] = await Query.write(query, req.body);

        if(result.affectedRows){
            const msg = "Document updated";
            res.json(success(msg));

        } else throw Error("Document couldn't be updated, probably syntax error in object");
        
    } catch (err) {
        throw Error(err);
    }
}

// Delete
export const remove = async (req,res) => {
    try {
        const query = "DELETE FROM document WHERE id = ?";
        const result = await Query.remove(query, req.body.id);
        
        if(result.affectedRows){
            const msg = "Document removed";
            res.json(success(msg));

        } else throw Error("Document category couldn't be removed, probably syntax error in object");

    } catch (err) {
        throw Error(err);
    }
}