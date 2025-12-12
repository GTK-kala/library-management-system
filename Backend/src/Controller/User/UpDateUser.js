import connection from "../../Config/db.js";

const UpDateUser = (req, res) => {
  const { name, email } = req.body;
  const id = parseInt(req.params.id);

  const sql = "UPDATE users (name , email) SET (? , ?) WHERE id = ?";
};
