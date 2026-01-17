import db from "../../Config/db.js";

export const GetAllUsers = (req, res) => {
  try {
    const toke = req.cookies.token || req.headers.authorization;
    if (!toke) {
      return res.status(401).json({
        message: "No token found",
      });
    }
    const sql = "SELECT * FROM users";
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
