const express = require("express");
let router = express.Router();
const multer = require("multer");
const path = require("path");
var appRoot = require("app-root-path");

const helpers = require("../helpers/uploadFileHelper");
const { getHomepage } = require("../controllers/homeController");
const {
  postCreateUser,
  getCreatePage,
} = require("../controllers/createController");
const {
  getUpdatePage,
  postUpdateUser,
} = require("../controllers/updateController");
const {
  postDeleteConfirm,
  postHandleRemoveUser,
} = require("../controllers/deleteController");
const {
  getUploadFilePage,
  handleUploadFile,
  uploadMultipleFile,
} = require("../controllers/uploadFileController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let upload = multer({ storage: storage, fileFilter: helpers.imageFilter });
let uploadMultiple = multer({ storage: storage, fileFilter: helpers.imageFilter,})
.array("multiple_images", 3);

const initWebRoute = (app) => {
  router.post("/create-user", postCreateUser);
  router.post("/update-user", postUpdateUser);
  router.post("/delete-user/:id", postDeleteConfirm);
  router.post("/delete-user", postHandleRemoveUser);
  router.post("/upload-profile-pic", upload.single("profile_pic"), handleUploadFile);
  router.post("/upload-multiple-images", (req, res, next) => {
      uploadMultiple(req, res, (err) => {
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_UNEXPECTED_FILE"
        ) {
          res.send("LIMIT_UNEXPECTED_FILE");
        } else if (err) {
          res.send(err);
        } else {
          next();
        }
      });
    },
    uploadMultipleFile
  );

  router.get("/create", getCreatePage);
  router.get("/update/:id", getUpdatePage); 
  router.get("/upload", getUploadFilePage);
  router.get("/", getHomepage);
  return app.use("/", router);
};

module.exports = initWebRoute;
