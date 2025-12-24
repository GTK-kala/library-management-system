import connection from "../../Config/db.js";

export const GetBooks = (req, res) => {
  try {
    const sqlBooks = "SELECT * FROM books";

    connection.query(sqlBooks, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      } else {
        return res.status(200).json({
          message: "All Books Data",
          result: result,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
