const { createUser } = require("../services/CRUDservices");

const postCreateUser = async (req, res) => {
  let { email, name, city } = req.body;
  email = email.trim();
  name = name.trim();
  city = city.trim();

  await createUser(email, name, city);

  res.redirect("/");
};

const getCreatePage = (req, res) => {
  return res.render("create.ejs");
};

module.exports = { postCreateUser, getCreatePage };
