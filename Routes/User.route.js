import express from 'express';
import { getallUser, logoutUser, updateProfile, userDelete, userLogin, userProfile, userRegister } from '../Controller/user.controller.js';
// let import 

let userRoute  = express.Router();

//User login :
userRoute.post("/register" , userRegister);
userRoute.post("/login" , userLogin);

//User Crud oparation :
userRoute.get("/profile" , userProfile);
userRoute.put("/update" , updateProfile);
userRoute.get("/logout" , logoutUser);
userRoute.delete("/delete" , userDelete);
userRoute.get("/alluser" , getallUser);

export default userRoute;