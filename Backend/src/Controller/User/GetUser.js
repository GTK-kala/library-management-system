import connection from "../../Config/db.js";

export const GetUser = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const sqlUser = "SELECT * FROM users WHERE id = ?";

    connection.query(sqlUser, [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      } else if (result.length === 0) {
        return res.status(500).json({
          message: "user not found",
        });
      } else {
        return res.status(200).json({
          message: "user Data",
          result: result[0],
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
