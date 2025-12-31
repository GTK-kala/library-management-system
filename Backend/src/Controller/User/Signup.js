import bcrypt from "bcryptjs";
import connection from "../../Config/db.js";

export const SignUpUser = (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = "member";

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const sqlEmail = "SELECT id FROM users WHERE email = ?";

    connection.query(sqlEmail, [email], (err, users) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      }

      if (users.length > 0) {
        return res.status(409).json({
          message: "Email already exists",
        });
      }

      const membership_id =
        "MEM-" + Math.random().toString(36).substring(2, 10).toUpperCase();

      const hashedPassword = bcrypt.hashSync(password, 10);

      const sqlInsert =
        "INSERT INTO users (name, email, role, password, membership_id) VALUES (?, ?, ?, ?, ?)";

      connection.query(
        sqlInsert,
        [name, email, role, hashedPassword, membership_id],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: err,
            });
          }

          return res.status(201).json({
            message: "User registered successfully",
          });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
