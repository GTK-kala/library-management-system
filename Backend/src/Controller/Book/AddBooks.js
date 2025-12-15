import connection from "../../Config/db.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: "Token is not Send!!!",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        message: "Token id Expired!!!",
      });
    }
    req.user = decoded;
    next();
  });
};

export const AddBooks = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    title,
    author,
    isbn,
    genre,
    publisher,
    cover_image_url,
    description,
    edition,
    language,
  } = req.body;

  const { publication_year, total_copies, pages } = parseInt(req.body);

  if (!id) {
    return res.status(400).json({
      message: "Id is not provided!!!",
    });
  }

  const sql1 = "SELECT * FROM users WHERE id = ?";

  connection.query(sql1, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error on server",
      });
    }
    const user = result[0];
    if (user.role != "admin") {
      return res.status(404).json({
        message: "Not Allowed to Add",
      });
    } else if (user.role === "admin") {
      const sql2 =
        "INSERT INTO books (title, author, isbn, genre, publication_year, publisher, total_copies, cover_image_url, description, edition, language, pages) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)";

      connection.query(
        sql2,
        [
          title,
          author,
          isbn,
          genre,
          publication_year,
          publisher,
          total_copies,
          cover_image_url,
          description,
          edition,
          language,
          pages,
        ],
        (err) => {
          if (err) {
            return console.log(err);
          }
          return res.status(200).json({
            message: "Book Added",
          });
        }
      );
    }
  });
};
