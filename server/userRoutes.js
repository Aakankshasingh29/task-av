import express from 'express';
import { getUsers } from './userController.js';
import userInfo from '../src/components/layout/userInfo.jsx';


const route = express.Router();
route.get("/getUsers",getUsers);
route.get("userInfo",userInfo);
// route.get("/userId/:id",userId);
// route.delete("/delete/:id",deleteUser);

export default route;