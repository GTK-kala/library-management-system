import connection from "../../Config/db.js";

export const HomeRoute = (req, res) => {
  const sql = "SELECT * FROM users";

  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error on connection to db",
      });
    }
    return res.status(200).json({
      message: "Data Fetched ok",
      result: result,
    });
  });
};
