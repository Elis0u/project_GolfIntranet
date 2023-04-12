import { success, error } from "../helpers/index.js";
import Query from "../model/query.js";
import {hash, compare} from "bcrypt";
import jwt from 'jsonwebtoken';

const {TOKEN_SECRET} = process.env;
const saltRounds = 10;

const checkToken = async (req, res) => {
    console.log(req.params)
    try {
        const query = "SELECT email, isAdmin FROM user WHERE id = ?";
        const [user] = await Query.findByValue(query, req.params.id);
    console.log("user -> ", user)
        if(user){
            const msg = "User recorved";
            res.status(200).json(success(msg, user));
        } else {
            const msg = "User not found with this identifier";
            res.status(200).json(success(msg));
        }

    } catch (error) {
        throw Error(error);
    }
}

export const all = async (req, res) => {
    try {
        const query = "SELECT user.id, firstName, lastName, birthDate, phone, handicap, avatarName, avatarAlt, isConfirmed, isAdmin FROM user";
        const [users] = await Query.find(query);
        if(users.length){
            const msg = "Recovery of all users";
            res.status(200).json(success(msg, users));
        } else {
            const msg = "No yet user in database";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const update_isConfirmed = async (req,res) => {
    try {
        const query = "UPDATE user SET isConfirmed = ? WHERE id = ?";
        const [result] = await Query.write(query, [req.body.isConfirmed, req.body.id]);

        if(result.affectedRows){
            const msg = "User confirme updated";
            res.json(success(msg));

        } else throw Error("User confirme couldn't be updated, probably syntax error in object");
        
    } catch (err) {
        throw Error(err);
    }
}

export const update_isAdmin = async (req,res) => {
    try {
        const query = "UPDATE user SET isAdmin = ? WHERE id = ?";
        const [result] = await Query.write(query, [req.body.isAdmin, req.body.id]);

        if(result.affectedRows){
            const msg = "User admin updated";
            res.json(success(msg));

        } else throw Error("User admin couldn't be updated, probably syntax error in object");
        
    } catch (err) {
        throw Error(err);
    }
}


// const one = async (req, res) => {
//     try {
//         const query = "SELECT email, isAdmin FROM user WHERE id = ?";
//         const user = await Query.findByValue(query, req.params.id);
        
//         if(user){
//             const msg = "Utilisateur récupéré";
//             res.status(200).json(success(msg, user));
//         } else {
//             const msg = "Pas de compte avec ces identifiants";
//             res.status(200).json(success(msg));
//         }

//     } catch (error) {
//         throw Error(error);
//     }
// }

const signup = async (req, res) => {
    try {    
        const query = "SELECT email password FROM user WHERE email = ?";
        const [isUserExist] = await Query.findByValue(query, req.body.email);

        if(!isUserExist){
            const hashedPWD = await hash(req.body.password, saltRounds);
            const data = { 
                email : req.body.email,
                password : hashedPWD,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                birthDate : req.body.birthDate,
                phone : req.body.phone,
                handicap : req.body.handicap,
            }
            const query = "INSERT INTO user (email, password, firstName, lastName, birthDate, phone, handicap, isConfirmed, isAdmin) VALUES (?,?,?,?,?,?,?,0,0)";
            const result = await Query.write(query, data);
            
            const msg = "User created";
            res.status(201).json(success(msg, result));
        }
        
    } catch (error) {
        throw Error(error);
    }
}

const signin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const query1 = "SELECT user.id, email, password, lastName, firstName, avatarName, isAdmin FROM user WHERE email = ?";
        const [user] = await Query.findByValue(query1, email);

        if(!user || (user.email !== req.body.email)){
            const msg = "identification problem";
            res.status(401).json(error(msg));
            return;
        } 
        const isSame = await compare(password, user.password);        

        if(isSame){
            const TOKEN = jwt.sign({id: user.id}, TOKEN_SECRET, {expiresIn : '3h'} );
            const { id, email, lastName, firstName, avatarName, isAdmin } = user;
            console.log(user);
            const msg = "connection successful"
            res.status(200).json(success(msg, {
                TOKEN,
                id: id,
                email,
                lastName: lastName,
                firstName: firstName,
                avatarName: avatarName,
                isAdmin: isAdmin,
            }));
        } else {
            const msg = "identification problem";
            res.status(401).json(error(msg));
        }
    } catch (error) {
        throw Error(error);
    }
}

export const remove_user = async (req,res) => {
    try {
        const query = "DELETE FROM user WHERE id = ?";
        const [ result ] = await Query.remove(query, req.body.id);
        
        if(result.affectedRows){
            const msg = "User removed";
            res.json(success(msg));

        } else throw Error("User couldn't be removed, probably syntax error in object");

    } catch (err) {
        throw Error(err);
    }
}

export {checkToken, signup, signin};