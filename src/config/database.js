require("dotenv").config();
const mysql = require("mysql2/promise");

// create connection database

// không nên dùng:
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT, // default 3306
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// nên dùng:
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // default 3306
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // giới hạn số kết nối tại 1 thời điểm
  queueLimit: 0,
});

module.exports = connection;
