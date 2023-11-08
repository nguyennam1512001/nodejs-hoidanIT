const express = require("express");
const { getHomepage } = require("../controllers/homeController");
const {
  postCreateUser,
  getCreateUser,
} = require("../controllers/createController");
const router = express.Router();

router.get("/", getHomepage);
router.post("/create-user", postCreateUser);
router.get("/create", getCreateUser);

module.exports = router;
