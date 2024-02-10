import jwt from "jsonwebtoken";

export const verifyToken = (req , res , next) => {
    
    // {const token = req.cookies.Access_Token;
    // if(!token) {
    //     return res.status(401).json('Unauthorized');
    // }

    // jwt.verify(token , process.env.JWT_secret , (err,user) => {
    //     if(err) return res.status(403).json('Token is invalid!');
    //     req.user = user;
    //     next();
    // })}
    try{
     let token = req.header("Authorization");
     if(!token) return res.status(403).json('Access token is invalid! or Denied');

     if(token.startsWith("Bearer ")) {
        token = token.slice(7,token.length).trimLeft();
     }

     const verified = jwt.verify(token , process.env.JWT_secret);
     req.user = verified;
     next();
    } catch(err){
        res.status(500).json({error : err.message});
    }
};