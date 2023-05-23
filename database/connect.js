const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: 'task',
});

db.connect((err) => {
  if (err) return console.log(err.message);
  console.log(`DB Connected Successfully`);
});

module.exports = db;
