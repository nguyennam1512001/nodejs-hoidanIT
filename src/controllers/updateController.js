const connection = require("../config/database");
const { getUser, updateUserById } = require("../services/CRUDservices");

const getUpdatePage = async (req, res) => {
  let userId = req.params.id;
  let results = await getUser(userId);
  return res.render("edit.ejs", { results });
};
const postUpdateUser = async (req, res) => {
  try {
    let { email, name, city, userId } = req.body;
    email = email.trim();
    name = name.trim();
    city = city.trim();
    userId = userId.trim();

    if (!email || !name || !city || !userId) {
      return res.status(400).send("Invalid input data");
    }

    const result = await updateUserById(email, name, city, userId);

    if (result.affectedRows === 0) {
      return res.status(404).send("User not found");
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getUpdatePage, postUpdateUser };
