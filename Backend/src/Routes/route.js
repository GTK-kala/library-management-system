import express from "express";

const route = express.Router();

// USER ROUTE FUNCTIONS
import { Login } from "../Controller/User/Login.js";
import { GetUser } from "../Controller/User/GetUser.js";
import { SignUpUser } from "../Controller/User/Signup.js";
import { UpDateUser } from "../Controller/User/UpDateUser.js";

// BOOKS ROUTE FUNCTIONS

import { GetBooks } from "../Controller/Book/GetBooks.js";

// USER ROUTE
route.post("/login", Login);
route.get("/user/:id", GetUser);
route.post("/register", SignUpUser);
route.put("/user/edit/:id", UpDateUser);

// BOOKS ROUTE
route.get("/books", GetBooks);

export default route;
