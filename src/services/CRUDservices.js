const connection = require("../config/database");

const getAllUser = async () => {
  let [results, fields] = await connection.query("SELECT * FROM Users");
  return results;
};

const getUser = async (id) => {
  let [results, fields] = await connection.query(
    "SELECT * FROM Users WHERE id = ?",
    [id]
  );
  let user = results && results.length > 0 ? results[0] : {};
  return user;
};

const updateUserById = async (email, name, city, userId) => {
  try {
    let [results, fields] = await connection.query(
      `UPDATE Users SET email=?, name=?, city=? WHERE id=?`,
      [email, name, city, userId]
    );
    return results;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const deleteUserById = async (id) => {
  try {
    let [results, fields] = await connection.execute(
      "DELETE FROM Users WHERE id = ?",
      [id]
    );
    return results;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

const createUser = async (email, name, city) => {
  if (email && name && city) {
    let [results, fields] = await connection.query(
      `INSERT INTO Users (email, name, city) VALUES (?, ?, ?)`,
      [email, name, city]
    );
  }
};

module.exports = {
  getAllUser,
  getUser,
  updateUserById,
  deleteUserById,
  createUser,
};
