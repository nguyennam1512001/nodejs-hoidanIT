require("dotenv").config();
const express = require("express"); //commonjs
var morgan = require('morgan')

const configViewEngine = require("./config/viewEngine");
const initAPIRoute = require("./routes/api");
const initWebRoute = require("./routes/web");
const app = express(); // app express
const port = process.env.PORT || 3000; // port
const hostname = process.env.HOST_NAME;
app.use((req, res, next)=>{
  console.log('>>>>>> run into my middleware');
  console.log(req.method);
  next()
})
app.use(morgan('combined'))

// config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

//config template engine
configViewEngine(app);

// init web route
initWebRoute(app);
// init API route
initAPIRoute(app);

//handle 404 not found
app.use((req,res)=>{
  return res.render('pageError/404.ejs')
})

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
