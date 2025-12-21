import connection from "../../Config/db.js";

export const GetUsers = (req, res) => {
  try {
    const sql = "SELECT count(*) FROM users where status = 'active'";

    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      }
      return res.status(200).json({
        message: "Data Fetched ok",
        result: result,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
