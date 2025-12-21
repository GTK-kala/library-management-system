import connection from "../../Config/db.js";

export const GetUsers = (req, res) => {
  try {
    const sql = "SELECT * FROM users";

    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      }
      const users = result.map((user) => (user.status = "active"));
      return res.status(200).json({
        message: "User with active status",
        result: users.length,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
