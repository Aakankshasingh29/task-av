import express from 'express';
import { getUsers, userId,deleteUser } from './userController';


const route = express.Router();
route.get("/getUsers",getUsers);
route.get("/userId/:id",userId);
route.delete("/delete/:id",deleteUser);

export default route;