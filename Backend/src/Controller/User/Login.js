import connection from "../../Config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const Login = (req, res) => {
  const { email, password } = req.body;
  const sqlEmail = "SELECT * FROM users WHERE email = ?";

  connection.query(sqlEmail, [email], (err, result) => {
    if (err) {
      return console.log(err);
    } else if (result.length === 0) {
      return res.status(400).json({
        message: "User not found!!!",
      });
    }

    const user = result[0];
    const hashedPassword = bcrypt.compareSync(password, user.password);

    if (!hashedPassword) {
      return res.status(400).json({
        message: "Password is Incorrect",
      });
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_Expire }
    );

    const cookie = {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    };

    return res.status(200).cookie("token", token, cookie).json({
      message: "Login successful",
      user: user,
    });
  });
};
