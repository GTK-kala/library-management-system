import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import route from "./Routes/route.js";
import cookieParser from "cookie-parser";

// Configure __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// const allowedOrigins = [process.env.VITE_API_URL, process.env.LOCAL_ORIGIN];

app.use(
  cors({
    origin: "https://library-management-system-ten-jade.vercel.app",
    credentials: true,
  })
);

// app.use(
//   cors({
//     origin: process.env.LOCAL_ORIGIN,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

const PORT = process.env.PORT || 3001;

app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "Public")));

app.use("/api", route);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
