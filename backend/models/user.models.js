import mongoose from "mongoose";

// user schema 


const userSchema = new mongoose.Schema({
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        userName:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true
        },
        profileImage:{
            type:String,
            required:false
        }

},{timestamps:true})



// user model 

const User = mongoose.model("User",userSchema);

export default User

