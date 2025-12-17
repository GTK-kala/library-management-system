import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

import route from "./Routes/route.js";

/* ----------------------------------
   ES MODULE __dirname FIX
-----------------------------------*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ----------------------------------
   LOAD ENV VARIABLES
-----------------------------------*/
dotenv.config({ path: path.join(__dirname, ".env") });

/* ----------------------------------
   INIT APP
-----------------------------------*/
const app = express();

/* ----------------------------------
   CORS CONFIG (VERY IMPORTANT)
-----------------------------------*/
const allowedOrigins = [
  "http://localhost:3000",
  "https://library-management-system-ten-jade.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ----------------------------------
   MIDDLEWARES
-----------------------------------*/
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

/* ----------------------------------
   ROUTES
-----------------------------------*/
app.use("/api", route);

/* ----------------------------------
   HEALTH CHECK (OPTIONAL BUT USEFUL)
-----------------------------------*/
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is running 🚀" });
});

/* ----------------------------------
   GLOBAL ERROR HANDLER
-----------------------------------*/
app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);
  res.status(500).json({ message: err.message || "Server error" });
});

/* ----------------------------------
   START SERVER
-----------------------------------*/
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
