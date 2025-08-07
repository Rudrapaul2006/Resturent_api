import express from 'express';
import { createOrder, deleteOrderById, getAllOrder, getOrderById } from '../Controller/Order.controler.js';
import { isAdmin } from '../Middlewere/admin.auth.js';

let orderRoute = express.Router();

orderRoute.post("/create" , createOrder);
orderRoute.get("/get/:id" , isAdmin , getOrderById );
orderRoute.get("/getall" , isAdmin , getAllOrder ); 
orderRoute.delete("/delete/:id" ,  deleteOrderById );


export default orderRoute;