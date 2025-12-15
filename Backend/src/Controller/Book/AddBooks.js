import connection from "../../Config/db.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

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
    req.user = decoded;
    next();
  });
};

export const AddBooks = (req, res) => {
  const userId = Number(req.params.id);

  if (!userId) {
    return res.status(400).json({
      message: "Invalid user ID",
    });
  }

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

  const publication_year = Number(req.body.publication_year);
  const total_copies = Number(req.body.total_copies);
  const pages = Number(req.body.pages);

  if (
    !title ||
    !author ||
    !isbn ||
    !publisher ||
    !edition ||
    !language ||
    !publication_year ||
    !pages ||
    !total_copies
  ) {
    return res.status(400).json({
      message: "All required fields must be provided",
    });
  }

  const sqlUser = "SELECT role FROM users WHERE id = ?";

  connection.query(sqlUser, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error while checking user",
      });
    }

    if (!result.length || result[0].role !== "admin") {
      return res.status(403).json({
        message: "You are not allowed to add books",
      });
    }

    const sqlInsert = `
      INSERT INTO books 
      (title, author, isbn, genre, publication_year, pages, language, edition, publisher, total_copies, cover_image_url, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      sqlInsert,
      [
        title,
        author,
        isbn,
        genre || null,
        publication_year,
        pages,
        language,
        edition,
        publisher,
        total_copies,
        cover_image_url || null,
        description || null,
      ],
      (err) => {
        if (err) {
          return res.status(500).json({
            message: "Failed to add book",
          });
        }

        return res.status(201).json({
          message: "Book added successfully",
        });
      }
    );
  });
};
