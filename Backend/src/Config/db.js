import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

//////// PRODUCTION DATABASE
// const connection = mysql.createConnection({
//   user: process.env.MYSQLUSER,
//   port: process.env.MYSQLPORT,
//   host: process.env.MYSQLHOST,
//   password: process.env.MYSQLPASSWORD,
//   database: process.env.MYSQLDATABASE,
// });

////////// PRACTICE DATABASE
const connection = mysql.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect(() => {
  console.log("Database Connected !!!");
});

export default connection;
