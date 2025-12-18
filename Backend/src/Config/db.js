import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  user: process.env.MYSQLUSER,
  port: process.env.MYSQLPORT,
  host: process.env.MYSQLHOST,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
});

connection.connect(() => {
  console.log("Database Connected !!!");
});

export default connection;
