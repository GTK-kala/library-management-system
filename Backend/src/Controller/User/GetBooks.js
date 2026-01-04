import connection from "../../Config/db.js";

export const GetBook = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const sql = `SELECT
                b.title,
                b.author,
                b.rating,
                b.id,
                b.description,
                b.cover_image_url,
                b.genre,
                br.status,
                DATEDIFF(br.due_date, br.borrowed_at) AS borrow_duration_days,
                DATEDIFF(br.due_date, CURRENT_DATE) AS days_left,
                br.due_date AS due,
                br.borrowed_at AS borrowed
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
