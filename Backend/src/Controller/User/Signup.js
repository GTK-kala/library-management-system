import connection from "../../Config/db.js";
import bcrypt from "bcryptjs";

export const SignUpUser = (req, res) => {
  const { name, email, role, password } = req.body;
  const userRole = role || "member";

  console.log(req.body);

  const sql1 = "SELECT * FROM users WHERE email = ?";

  connection.query(sql1, [email], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error on Server!!!",
      });
    }

    if (result.length > 0) {
      return res.status(400).json({
        message: "Email already exists!!!",
        result: result,
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const sql2 =
      "INSERT INTO users (name, email, role, password) VALUES (?, ?, ? , ?)";

    connection.query(
      sql2,
      [name, email, userRole, hashedPassword],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return res.status(200).json({
            message: "User registered successfully",
            result: result,
          });
        }
      }
    );
  });
};
