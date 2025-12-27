import connection from "../../Config/db.js";

export const GetBooksStatus = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).json({
        message: "Id is not provided",
      });
    } else {
      const sql = `SElECT * FROM borrowings WHERE user_id = ?`;
      connection.query(sql, [id], (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err,
          });
        } else {
          return res.status(200).json({
            message: "All Books Data",
            result: result,
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
