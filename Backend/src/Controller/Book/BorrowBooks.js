import jwt from "jsonwebtoken";
import connection from "../../Config/db.js";

export const BorrowBooks = (req, res, next) => {
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
              next();
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

export const VerifyUser = (req, res) => {
  try {
    const borrowed = "borrowed";
    const id_book = parseInt(req.params.id);
    const token = req.cookies.token;
    const sql3 = `INSERT INTO borrowings (user_id , book_id , due_date , status) VALUE (? , ? , DATE_ADD(NOW(), INTERVAL 14 DAY), ?)`;

    if (!token) {
      return res.status(401).json({
        message: "Authentication token missing",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid or expired token",
        });
      }
      const user = decoded;
      const id_user = user.id;
      connection.query(sql3, [id_user, id_book, borrowed], (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err,
          });
        } else {
          return res.status(200).json({
            message: "Book Borrow Successfully!!!",
          });
        }
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
