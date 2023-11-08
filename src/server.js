require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("./config/viewEngine");

const app = express(); // app express
const port = process.env.PORT || 3000; // port
const hostname = process.env.HOST_NAME;
const webRoutes = require("./routes/web");

// config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

//config template engine
configViewEngine(app);

// khai báo route
app.use("/", webRoutes);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});