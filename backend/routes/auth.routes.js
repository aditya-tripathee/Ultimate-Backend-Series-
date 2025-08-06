import express, { Router } from "express";
import { login, logout, signUp } from "../controllers/auth.controllers.js";


const authRouter = express(Router());

// signup routes
authRouter.post("/signup",signUp);
// login routes
authRouter.post("/login",login);
// logout routes
authRouter.post("/logout",logout);






export default authRouter
