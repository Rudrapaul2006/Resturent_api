import express from 'express';
import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//user router import :
import userRoute from './Routes/User.route.js';
//Resturent details router import :
import resturentRoute from './Routes/resturent.route.js';
//Resturent menu route import :
import menuRoute from './Routes/menu.route.js';

dotenv.config();

//server creation :
let server = express();
server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({extended : true}));

//Database Connection :
mongoose.connect(process.env.MONGODB_URL , {
    dbName : "RESTURENT_API",
}).then(() => {
    console.log(chalk.bgBlack.cyan("MongoDB Connected"));
}).catch((err) => {
    console.log(chalk.red.bold("Something error" , err));
})

server.get('/' , (req , res) => {
    res.send("Resturent api is working ..");
})

//Routing :    
server.use('/api/user' , userRoute); 
server.use('/api/resturent' , resturentRoute);
server.use('/api/menu' , menuRoute);

//server's port :
let port = process.env.PORT;
server.listen(port , () => {
    console.log(chalk.yellow(`Server Running At Port : http://localhost:${port}`) );
}) 