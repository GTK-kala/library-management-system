import express from "express";
import multer from "multer";

// HANDLING IMAGE AND OTHER BIG DATA
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
});

const route = express.Router();

// USER ROUTE FUNCTIONS
import { Login } from "../Controller/User/Login.js";
import { GetUser } from "../Controller/User/GetUser.js";
import { SignUpUser } from "../Controller/User/Signup.js";
import { UpDateUser } from "../Controller/User/UpDateUser.js";

// BOOKS ROUTE FUNCTIONS

import { GetBooks } from "../Controller/Book/GetBooks.js";
import { verifyToken, AddBooks } from "../Controller/Book/AddBooks.js";

// USER ROUTE
route.post("/login", Login);
route.get("/user/:id", GetUser);
route.post("/register", SignUpUser);
route.put("/user/edit/:id", UpDateUser);

// BOOKS ROUTE
route.get("/books", GetBooks);
route.post("/book/add/:id", upload.single("cover"), verifyToken, AddBooks);

export default route;
