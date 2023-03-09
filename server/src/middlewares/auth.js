import jwt from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;

export const auth = (req, res, next) => {
    const TOKEN = req.headers['x-access-token'];
    console.log("Console log auth.js : token ->", TOKEN)
    if(TOKEN === undefined || TOKEN === "null"){
        res.status(404).json({msg: "token not found"});
        return;
    } else {
        jwt.verify(TOKEN, TOKEN_SECRET, (err, decoded)=>{
            if(err){
                res.status(401).json({status: 401, msg: "token invalid"});
                return;
            } else {
                req.params.id = decoded.id;
                next();
            }
        });
    }
}