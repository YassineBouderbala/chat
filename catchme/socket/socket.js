var exports = module.exports;
var user_socket = require('./user_socket.js');

exports.set = function(socket){
	user_socket.set(socket);
}