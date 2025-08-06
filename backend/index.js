import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import database connection
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
dotenv.config();

let app = express();
let port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

// middlewares 
app.use("/api",authRouter);



// app.get("/", async (req,res)=>{
//    res.send("Home Page")
// })



app.listen(port,()=>{
    connectDB();
    console.log(`Server listening at PORT ${port}`);
})

