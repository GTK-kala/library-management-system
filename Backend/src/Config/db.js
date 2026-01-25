import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

//////// PRODUCTION DATABASE
const connection = mysql.createConnection({
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect(() => {
  console.log("Database Connected !!!");
});

export default connection;
