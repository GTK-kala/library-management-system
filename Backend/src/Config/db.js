import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const Url_Db = `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DATABASE}`;

const connection = mysql.createConnection(Url_Db);

connection.connect(() => {
  console.log("Database Connected !!!");
});

export default connection;
