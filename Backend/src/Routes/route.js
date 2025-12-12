import express from "express";

const route = express.Router();

// USER ROUTE FUNCTIONS
import { Login } from "../Controller/User/Login.js";
import { SignUpUser } from "../Controller/User/Signup.js";

route.post("/login", Login);
route.post("/register", SignUpUser);

export default route;
