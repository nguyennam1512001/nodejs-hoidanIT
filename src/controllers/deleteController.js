const { getUser, deleteUserById } = require("../services/CRUDservices");

const postDeleteConfirm = async (req, res) => {
  let userId = req.params.id;
  let results = await getUser(userId);
  res.render("deleteConfirm.ejs", { results });

  // let [results, fields] = await connection.query(
  //     'DELETE FROM Users WHERE id = ?',[id]
  // )
};

const postHandleRemoveUser = async (req, res) => {
  const id = req.body.userId;
  await deleteUserById(id);
  res.redirect("/");
};

module.exports = { postDeleteConfirm, postHandleRemoveUser };
