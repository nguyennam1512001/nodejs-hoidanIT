const connection = require("../config/database");

const postCreateUser = (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  connection.query(
    `INSERT INTO 
          Users (email, name, city)
          VALUES (?, ?, ?)`,
    [email, name, city],
    function (err, results) {
      res.send("Create user success");
    }
  );
};

const getCreateUser = (req, res) => {
  return res.render("create.ejs");
};

module.exports = { postCreateUser, getCreateUser };
