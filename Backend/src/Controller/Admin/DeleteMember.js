import db from "../../Config/db.js";

export const DeleteMember = (req, res) => {
  try {
    const memberId = parseInt(req.params.id);
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    } else {
      const deleteQuery = "DELETE FROM users WHERE id = ?";
      db.query(deleteQuery, [memberId], (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
        return res.status(200).json({
          message: "Member deleted successfully",
        });
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
