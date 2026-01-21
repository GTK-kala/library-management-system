import db from "../../Config/db.js";

export const GetAllUsers = (req, res) => {
  try {
    const toke = req.cookies.token || req.headers.authorization;
    if (!toke) {
      return res.status(401).json({
        message: "No token found!!!",
      });
    }
    const sql = `SELECT 
          u.id,
          u.name,
          u.email,
          u.role,
          u.status,
          u.membership_id,
          COUNT(bb.id) AS borrowed_count
          FROM users u
          LEFT JOIN borrowings bb 
          ON u.id = bb.user_id
          GROUP BY u.id, u.name, u.email, u.role;
      `;
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
      return res.status(200).json({
        message: "Users fetched successfully",
        result: result,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
