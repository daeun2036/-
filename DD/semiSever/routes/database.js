const mysql = require("mysql2");

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'duddnjsgl!23',
    database : 'todolist'
  });
  
  connection.connect();

  module.exports = connection;