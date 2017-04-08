var exports = module.exports;
var dao_user = require('../dao/user_dao.js');

exports.set = function(app){
	
    app.get('/users', function(req, res) {
        res.setHeader('Content-Type', 'text/json');
        dao_user.selectAllUser(function(response){
            res.end(JSON.stringify(response));            
        });
    });
}