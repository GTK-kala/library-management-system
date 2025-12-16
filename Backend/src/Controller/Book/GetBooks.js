import connection from "../../Config/db.js";

export const GetBooks = (req, res) => {
  const sqlBooks = "SELECT * FROM books";

  connection.query(sqlBooks, (err, result) => {
    if (err) {
      return console.log(err);
    } else {
      return res.status(200).json({
        result: result.slice(0, 6),
      });
    }
  });
};
