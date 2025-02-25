import express from 'express';
import { getUsers } from './userController.js';


const route = express.Router();
route.get("/getUsers",getUsers);
route.get("userInfo",getInfo);
// route.get("/userId/:id",userId);
// route.delete("/delete/:id",deleteUser);

export default route;