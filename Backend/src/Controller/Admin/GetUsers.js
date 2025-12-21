import connection from "../../Config/db.js";

export const GetUsers = (req, res) => {
  try {
    const sql = `select count(*) as totalUsers from users where status = "active"`;

    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      }
      return res.status(200).json({
        message: "User with active status",
        result: result[0].totalUsers,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
