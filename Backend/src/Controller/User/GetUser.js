import connection from "../../Config/db.js";

export const GetUser = (req, res) => {
  const id = parseInt(req.params.id);

  const sqlUser = "SELECT * FROM users WHERE id = ?";

  connection.query(sqlUser, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length === 0) {
      console.log("no user found");
    } else {
      res.status(200).json({
        message: "user Data",
        result: result[0],
      });
    }
  });
};
