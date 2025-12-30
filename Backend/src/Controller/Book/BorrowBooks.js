import connection from "../../Config/db.js";

export const BorrowBooks = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const sql1 = `SELECT * FROM books WHERE id = ?`;
    if (!id) {
      return res.status(401).json({
        message: "Id Not Provided!!!",
      });
    } else {
      connection.query(sql1, [id], (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err,
          });
        } else if (result.length === 0) {
          return res.status(404).json({
            message: "Book not found!!!",
          });
        } else if (result.length > 0) {
          const available = 0;
          const sql2 = `UPDATE books set is_available = ? WHERE id = ?`;
          connection.query(sql2, [available, id], (err, result) => {
            if (err) {
              return res.status(500).json({
                message: err,
              });
            } else {
              return res.status(200).json({
                message: "Book Borrow Successfully!!!",
                result: result,
              });
            }
          });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
