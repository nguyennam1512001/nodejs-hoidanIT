// const connection = require("../config/database");
const {
  getAllUser,
  createUser,
  deleteUserById,
  updateUserById,
} = require("../services/CRUDservices");
let getAllUsers = async (req, res) => {
  let rows = await getAllUser();
  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};

let createNewUser = async (req, res) => {
  let { email, name, city } = req.body;
  if (!email || !name || !city) {
    return res.status(200).json({
      message: "missing required params",
    });
  }
  await createUser(email, name, city);

  return res.status(200).json({
    message: "ok",
  });
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        message: "Bad request. Missing user ID.",
      });
    }

    const result = await deleteUserById(id);

    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "Delete success",
      });
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateUser = async (req, res) => {
  let { email, name, city, id } = req.body;
  email = email?.trim();
  name = name?.trim();
  city = city?.trim();
  try {
    if (!email || !name || !city) {
      return res.status(400).json({
        message: "missing required params",
      });
    }

    const result = await updateUserById(email, name, city, id);

    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "update success",
      });
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { getAllUsers, createNewUser, deleteUser, updateUser };
