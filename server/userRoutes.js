import express from 'express';
import { getUsers, getUserInfo, getdeviceDetails  } from './userController.js';



const route = express.Router();
route.get("/getUsers",getUsers);
route.get("/userInfo/:distributorId",getUserInfo);
route.get("/deviceDetails/:shopId",getdeviceDetails);
// route.delete("/delete/:id",deleteUser);

export default route;