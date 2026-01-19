import connection from "../../Config/db.js";

export const UserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access. Please log in.",
      });
    } else if (!id || !status) {
      return res.status(400).json({
        message: "User ID and status are required",
      });
    } else {
      const sql = "UPDATE users SET status = ? WHERE id = ?";
      connection.query(sql, [status, id], (err, results) => {
        if (err) {
          console.error("Error updating user status:", err);
          return res.status(500).json({
            message: "Error updating user status",
          });
        }
        return res.status(200).json({
          message: "User status updated successfully",
          data: results,
        });
      });
    }
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
