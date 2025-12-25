import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

//////// PRODUCTION DATABASE
const connection = mysql.createConnection({
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  host: process.env.MYSQLHOST,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
});

connection.connect(() => {
  console.log("Database Connected !!!");
});

export default connection;
