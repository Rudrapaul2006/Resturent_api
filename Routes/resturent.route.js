import express from 'express';
import { deleteResturent, getResturentDetails, resturentDetails, updateResturentDetails } from '../Controller/resturent.controller.js';
import { isAdmin } from '../Middlewere/admin.auth.js';


let resturentRoute = express.Router();

resturentRoute.post("/details", isAdmin ,resturentDetails); // Only admin can add resturent Details :
resturentRoute.get("/getdatails/:name", getResturentDetails); // all can access 
resturentRoute.put("/updatedetails/:name", isAdmin , updateResturentDetails); // only admin can access it :
resturentRoute.delete("/deleteresturent/:name", isAdmin , deleteResturent); // only admin can access it :


export default resturentRoute;