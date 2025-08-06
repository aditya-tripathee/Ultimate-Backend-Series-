import jwt from "jsonwebtoken";


const generateToken = (id) =>{
    // sign is used to assign token 
    let token =  jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"});
    return token;

}

export default generateToken;
