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
        const query = "SELECT user.id, firstName, lastName, birthDate, phone, handicap, avatarName, avatarAlt FROM user";
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
                lastName : req.body.lastName
            }
            const query = "INSERT INTO user (email, password, firstName, lastName, isConfirmed, isAdmin) VALUES (?,?,?,?,0,0)";
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
        const query1 = "SELECT id, email, password, lastName, firstName, avatarName, isAdmin FROM user WHERE email = ?";
        const [user] = await Query.findByValue(query1, email);

        if(!user || (user.email !== req.body.email)){
            const msg = "identification problem";
            res.status(401).json(error(msg));
            return;
        } 
        const isSame = await compare(password, user.password);        

        if(isSame){
            const TOKEN = jwt.sign({id: user.id}, TOKEN_SECRET, {expiresIn : '60000'} );
            const { email, lastName, firstName, avatarName } = user;
            console.log(TOKEN);
            const msg = "connection successful"
            res.status(200).json(success(msg, {
                TOKEN,
                email,
                lastName: lastName,
                firstName: firstName,
                avatarName: avatarName
            }));
        } else {
            const msg = "identification problem";
            res.status(401).json(error(msg));
        }
    } catch (error) {
        throw Error(error);
    }
}

export {checkToken, signup, signin};