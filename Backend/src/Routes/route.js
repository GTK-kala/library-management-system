import express from "express";

const route = express.Router();

// USER ROUTE FUNCTIONS
import { SignUpUser } from "../Controller/User/Signup.js";

route.post("/signup", SignUpUser);

export default route;
