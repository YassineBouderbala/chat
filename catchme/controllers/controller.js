var exports = module.exports;
var user_controller = require('./user_controller.js');

exports.set = function(app){

	user_controller.set(app);
}