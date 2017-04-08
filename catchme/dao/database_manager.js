var mysql = require('mysql');
var exports = module.exports;

var mysql_client = mysql.createPool({
  connectionLimit : 100,
  host     : "localhost",
  user     : "root",
  password : "root",
  database : "node"
});

exports.getManager = function(response){
	response(mysql_client);
}