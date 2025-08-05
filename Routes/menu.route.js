import express from 'express';
import { addMenu, deleteMenu, getAllMenu, updateMenu } from '../Controller/menu.controller.js';
import { isAdmin } from '../Middlewere/admin.auth.js';

let menuRoute = express.Router();

menuRoute.post("/add", isAdmin , addMenu);
menuRoute.put("/update/:id", isAdmin , updateMenu);
menuRoute.get("/allmenu", getAllMenu); 
menuRoute.delete("/delete/:id", isAdmin , deleteMenu);


export default menuRoute;