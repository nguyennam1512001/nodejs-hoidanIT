const { getAllUser } = require("../services/CRUDservices");

const getHomepage = async (req, res) => {
  let results = await getAllUser();
  return res.render("home.ejs", { listUsers: results });
};

module.exports = { getHomepage };
