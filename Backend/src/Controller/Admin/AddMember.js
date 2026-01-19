import bcrypt from "bcryptjs";
import connection from "../../Config/db.js";

export const AddMember = (req, res) => {
  try {
    const token = req.cookies.token;
    const { name, email, password, role } = req.body;
    const sql = `SELECT * FROM users WHERE email = ?`;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access. Please log in.",
      });
    }
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All required fields must be provided.",
      });
    }
    connection.query(sql, [email], (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Error checking email.",
          error: err,
        });
      }
      if (results.length > 0) {
        return res.status(409).json({
          message: "Email already exists.",
        });
      }
      if (results.length === 0) {
        const membership_id =
          "MEM-" + Math.random().toString(36).substring(2, 10).toUpperCase();

        const hashedPassword = bcrypt.hashSync(password, 10);
        const query =
          "INSERT INTO users (name, email, password, role, membership_id) VALUES (?, ?, ?, ?, ?)";
        connection.query(
          query,
          [name, email, hashedPassword, role, membership_id],
          (err, results) => {
            if (err) {
              return res.status(500).json({
                message: "Error adding member to the database.",
                error: err,
              });
            }
            return res.status(201).json({
              message: "Member added successfully.",
              data: results,
            });
          },
        );
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
