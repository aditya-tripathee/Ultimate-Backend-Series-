// this is the authentication file
import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import generateToken from "../config/token.js";

export const signUp = async (req,res)=>{
      try {
       const {firstName, lastName, email, userName, password} = req.body;
       if(!firstName || !lastName || !email || !userName || !password){
         return res.status(400).json({message:"send all details"})
       }
       let existUser = await User.findOne({email:email});
       if(existUser){
        return res.status(400).json({message:"User already exist"})
       }
       const hashPassword = await bcrypt.hash(password,15);
      
       const user = await User.create({firstName,lastName,email,password:hashPassword,userName});
       
    //    generate token by user id 
       let token;
       try {
        token = generateToken(user._id);
        
       } catch (error) {
         console.log(error);
         
       }

       res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENVIRONMENT == "production",
        sameSite : "strict",
        maxAge : 7*24*60*60*1000

       })



       return res.status(200).json(user);

      } 

      catch (error) {
        console.log(error);
        
        return res.status(500).json({message:"Internal server error"})
      }
}



// login 
export const login = async (req,res)=>{
    try {
      const {userName,password} = req.body;
      let existUser = await User.findOne({userName});
      if(!existUser){
        return res.status(400).json({message:"user doesn't exist"})
      }

      let match = await bcrypt.compare(password,existUser.password)
      if(!match){
        return res.status(400).json({message:"incorrect password"})
      }

      let token;
      try {
        token = generateToken(existUser._id)
        
      } catch (error) {
        console.log(error);
        
      }
      
      res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENVIRONMENT == "production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000,
      })

      return res.status(200).json({user:{
        firstName:existUser.firstName
        ,lastName:existUser.lastName
        ,userName:existUser.userName,
        email:existUser.email
      }});
    } 

    catch (error) {
      return res.status(500).json(error);

    }
}

// logout 

export const logout = async (req,res)=>{
  try {
       res.clearCookie("token");
       res.status(200).json({message:"logout successfully!"})
  } catch (error) {
    return res.status(500).json(error);
    
  }
}