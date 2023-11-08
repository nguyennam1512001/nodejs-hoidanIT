const connection = require("../config/database");

const getHomepage = (req, res) => {
  return res.render("home.ejs");
};

module.exports = { getHomepage };
