import express from 'express';
import { getUsers, getUserInfo, getdeviceDetails, getCounts  } from './userController.js';



const route = express.Router();
route.get("/getUsers",getUsers);
route.get("/userInfo/:distributorId",getUserInfo);
route.get("/deviceDetails/:shopId",getdeviceDetails);
route.get("/counts",getCounts);
// route.delete("/delete/:id",deleteUser);

export default route;