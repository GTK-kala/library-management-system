import express from "express";

const route = express.Router();

// USER ROUTE FUNCTIONS
import { Login } from "../Controller/User/Login.js";
import { SignUpUser } from "../Controller/User/Signup.js";
import { GetUser } from "../Controller/User/GetUser.js";

route.post("/login", Login);
route.get("/user/:id", GetUser);
route.post("/register", SignUpUser);

export default route;
