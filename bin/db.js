const mysql = require('mysql');


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'anyely',
  password : 'anyely074',
  database : 'sistemasExpertos'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

module.exports.connection = connection;