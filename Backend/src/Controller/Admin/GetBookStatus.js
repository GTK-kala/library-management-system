import connection from "../../Config/db.js";

export const GetBookStatus = (req, res) => {
  try {
    const sql = `SELECT * FROM borrowings`;

    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      }
      return res.status(200).json({
        message: "User with active status",
        result: result,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
