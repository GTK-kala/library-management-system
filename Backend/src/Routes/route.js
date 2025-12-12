import express from "express";

const route = express.Router();

// USER ROUTE FUNCTIONS
import { Login } from "../Controller/User/Login.js";
import { GetUser } from "../Controller/User/GetUser.js";
import { SignUpUser } from "../Controller/User/Signup.js";
import { UpDateUser } from "../Controller/User/UpDateUser.js";

route.post("/login", Login);
route.get("/user/:id", GetUser);
route.patch("/user/edit", UpDateUser);
route.post("/register", SignUpUser);

export default route;
