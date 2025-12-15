import connection from "../../Config/db.js";

export const UpDateUser = (req, res) => {
  const { name, email } = req.body;
  const id = parseInt(req.params.id);
  let fields = [];
  let values = [];

  if (name) {
    fields.push("name = ?");
    values.push(name);
  }

  if (email) {
    fields.push("email = ?");
    values.push(email);
  }
  values.push(id);

  const sqlUpDate = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

  connection.query(sqlUpDate, values, (err, result) => {
    if (err) {
      return console.log(err);
    } else {
      res.status(200).json({
        message: "USER INFO UPDATED !!!",
        result: result[0],
      });
    }
  });
};
