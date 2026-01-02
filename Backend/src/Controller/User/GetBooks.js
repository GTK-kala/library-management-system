import connection from "../../Config/db.js";

export const GetBook = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const sql = `SELECT
                b.title,
                b.author,
                br.status,
                br.due_date AS due
                FROM borrowings br
                JOIN books b ON br.book_id = b.id
                WHERE br.user_id = ?;
                `;
    connection.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      } else {
        return res.status(200).json({
          message: "All Borrowed Books Data",
          result: result,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
