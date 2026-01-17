import multer from "multer";
import express from "express";

// HANDLING IMAGE AND OTHER BIG DATA
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
});

const route = express.Router();

// USER ROUTE FUNCTIONS
import { Login } from "../Controller/User/Login.js";
import { GetBook } from "../Controller/User/GetBooks.js";
import { SignUpUser } from "../Controller/User/Signup.js";
import { UpDateUser } from "../Controller/User/UpDateUser.js";
import { verifyUser, verifyToken } from "../Controller/User/GetUser.js";

// BOOKS ROUTE FUNCTIONS
import { GetBooks } from "../Controller/Book/GetBooks.js";
import { GetBooksStatus } from "../Controller/Book/GetBooksStatus.js";
import { verifyTokens, AddBooks } from "../Controller/Book/AddBooks.js";
import { BorrowBooks, VerifyUser } from "../Controller/Book/BorrowBooks.js";

// ADMIN ROUTES FUNCTIONS
import { GetAllUsers } from "../Controller/Admin/GetAllUsers.js";
import { GetBookStatus } from "../Controller/Admin/GetBookStatus.js";

// ADMIN ROUTE
route.get("/users", GetAllUsers);
route.get("/book/status", GetBookStatus);

// USER ROUTE
route.post("/login", Login);
route.post("/register", SignUpUser);
route.put("/user/edit/:id", UpDateUser);
route.get("/user/books/:id", GetBook);
route.get("/user/:id", verifyToken, verifyUser);

// BOOKS ROUTE
route.get("/books", GetBooks);
route.get("/book/status/:id", GetBooksStatus);
route.put("/book/borrow/:id", BorrowBooks, VerifyUser);
route.post("/book/add/:id", upload.single("cover"), verifyTokens, AddBooks);

export default route;
