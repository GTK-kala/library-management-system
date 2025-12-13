import connection from "../../Config/db.js";

export const GetBooks = (req, res) => {
  const sql = "SELECT * FROM books";
  connection.query(sql, (err, result) => {
    if (err) {
      return console.log(err);
    } else {
      return res.status(200).json({
        result: result.slice(0, 5),
      });
    }
  });
};
