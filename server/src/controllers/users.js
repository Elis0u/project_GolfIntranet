import { success, error } from "../helpers/index.js";
import Query from "../model/query.js";
import { hash, compare } from "bcrypt";
import jwt from 'jsonwebtoken';
import path from 'path';

const { TOKEN_SECRET } = process.env;
const saltRounds = 10;

export const checkToken = async (req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers["authorization"];
        if (!token) {
            return res.status(401).json({ error: "Token missing" });
        }

        jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Token expired" });
            }

            const query = "SELECT email, isAdmin FROM user WHERE id = ?";
            const [user] = await Query.findByValue(query, decoded.id);
            if (user) {
                const msg = "User recorved";
                res.status(200).json(success(msg, user));
            } else {
                const msg = "User not found with this identifier";
                res.status(200).json(success(msg));
            }
        });
    } catch (error) {
        res.status(500).json({ err: "An error occurred while processing your request." });
    }
};

export const all = async (req, res) => {
    try {
        const query = "SELECT user.id, firstName, lastName, birthDate, phone, handicap, avatarName, isConfirmed, isAdmin FROM user";
        const [users] = await Query.find(query);
        if (users.length) {
            const msg = "Recovery of all users";
            res.status(200).json(success(msg, users));
        } else {
            const msg = "No yet user in database";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}

export const activitiesUser = async (req, res) => {
    try {
        const userId = parseInt(req.query.userId, 10);

        const query = "SELECT 'document' AS activity_type, document.id AS id, document.title AS title, document.createdAt AS createdAt FROM document WHERE document.user_id = ? UNION ALL SELECT 'event' AS activity_type, event.id AS id, event.title AS title, event.createdAt AS createdAt FROM event WHERE event.user_id = ? ORDER BY createdAt DESC LIMIT 6"
        const [activitiesUser] = await Query.findByParams(query, [userId, userId]);

        if (activitiesUser.length) {
            const msg = "Recovery of all activites user";
            res.status(200).json(success(msg, activitiesUser))
        } else {
            const msg = "No yet activity for user in database";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}

export const update_isConfirmed = async (req, res) => {
    try {
        const query = "UPDATE user SET isConfirmed = ? WHERE id = ?";
        const [result] = await Query.write(query, [req.body.isConfirmed, req.body.id]);

        if (result.affectedRows) {
            const msg = "User confirme updated";
            res.status(200).json(success(msg));

        } else {
            const msg = "User couldn't be updated, probably syntax error in object";
            res.status(400).json({ error: msg });
        }

    } catch (err) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}

export const update_isAdmin = async (req, res) => {
    try {
        const query = "UPDATE user SET isAdmin = ? WHERE id = ?";
        const [result] = await Query.write(query, [req.body.isAdmin, req.body.id]);

        if (result.affectedRows) {
            const msg = "User admin updated";
            res.status(200).json(success(msg));

        } else {
            const msg = "User couldn't be updated, probably syntax error in object";
            res.status(400).json({ error: msg });
        }

    } catch (err) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}

export const update_user = async (req, res) => {
    try {
        const { email, firstName, lastName, birthDate, phone, handicap, id } = req.body;

        const query = "UPDATE user SET email = ?, firstName = ?, lastName = ?, birthDate = ?, phone = ?, handicap = ? WHERE id = ?";
        const [result] = await Query.write(query, [email, firstName, lastName, birthDate, phone, handicap, id]);

        if (result.affectedRows) {
            const msg = "User updated";
            res.status(200).json(success(msg));

        } else {
            const msg = "User couldn't be updated, probably syntax error in object";
            res.status(400).json({ error: msg });
        }

    } catch (err) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}

export const update_avatar = async (req, res) => {
    try {
        const userId = req.user.id;
        const avatarPath = path.basename(req.file.path);

        const query = "UPDATE user SET avatarName = ? WHERE id = ?";
        const [result] = await Query.write(query, [avatarPath, userId]);

        if (result.affectedRows) {
            const msg = "Avatar updated successfully";
            res.status(200).json(success(msg, { avatarName: avatarPath }));
        } else {
            const msg = "Error updating avatar";
            res.status(400).json({ error: msg });
        }
    } catch (error) {
        res.status(500).json({ err: "An error occurred while processing your request.", error: error });
    }
};

export const signup = async (req, res) => {
    try {
        const query = "SELECT email password FROM user WHERE email = ?";
        const [isUserExist] = await Query.findByValue(query, req.body.email);

        if (!isUserExist) {
            const hashedPWD = await hash(req.body.password, saltRounds);
            const data = {
                email: req.body.email,
                password: hashedPWD,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                phone: req.body.phone,
                handicap: req.body.handicap,
            }
            const query = "INSERT INTO user (email, password, firstName, lastName, birthDate, phone, handicap, isConfirmed, isAdmin) VALUES (?,?,?,?,?,?,?,0,0)";
            const result = await Query.write(query, data);

            const msg = "User created";
            res.status(201).json(success(msg, result));
        }

    } catch (error) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const query1 = "SELECT user.id, email, password, lastName, firstName, birthDate, phone, handicap, avatarName, isAdmin, isConfirmed FROM user WHERE email = ?";
        const [user] = await Query.findByValue(query1, email);

        if (!user || (user.email !== req.body.email)) {
            const msg = "identification problem";
            res.status(401).json(error(msg));
            return;
        }
        const isSame = await compare(password, user.password);

        if (isSame) {
            if (user.isConfirmed === 0) {
                const msg = "not_confirmed";
                res.status(200).json({ error: msg });
                return;
            }

            const TOKEN = jwt.sign({ id: user.id }, TOKEN_SECRET, { expiresIn: '1d' });
            const { id, email, lastName, firstName, birthDate, phone, handicap, avatarName, isAdmin } = user;
            const msg = "connection successful";
            res.status(200).json(success(msg, {
                TOKEN,
                id: id,
                email,
                lastName: lastName,
                firstName: firstName,
                birthDate: birthDate,
                avatarName: avatarName,
                phone: phone,
                handicap: handicap,
                isAdmin: isAdmin,
            }));
        } else {
            const msg = "identification problem";
            res.status(401).json(error(msg));
        }
    } catch (error) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}

export const remove_user = async (req, res) => {
    try {
        const query = "DELETE FROM user WHERE id = ?";
        const [result] = await Query.remove(query, req.body.id);

        if (result.affectedRows) {
            const msg = "User removed";
            res.status(200).json(success(msg));

        } else {
            const msg = "User couldn't be removed, probably syntax error in object";
            res.status(400).json({ error: msg });
        }

    } catch (err) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}
