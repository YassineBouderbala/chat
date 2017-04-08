var dao_user = require('../catchme/dao/user_dao.js');
var job_user = require('./user_job.js');

var exports = module.exports;

exports.selectIdByUsername = function(data,response){
		dao_user.selectUsernameToken(data.token,data.username,function(resp){
			if(resp.code == 200){
				dao_user.selectIdByUsernameTmp(data.user.username, function(err,code,rows){
					if(code == 100){
						response({"code" : 100, "status" : "Error in connection database"});
					}else if(code == 400){
						response({"code" : 400, "status" : "Bad Request"});
					}else{
						if(!err && rows.length > 0) {
							var row = rows[0];
							response({
								code : 200,
								user : row
							});
						}else{
							response({
								code : 404,
								description: 'User : Not Found'
							});		            	
						} 
					}		
				});
			}else{
				response({
					code : 401,
					description: 'Unauthorized'
				});	
			}
		});
}

exports.insertMessage = function(socket, data,response){
		data.user.username = data.user.from;
		job_user.selectIdByUsername(data,function(resp1){
			if(resp1.code == 200){
				data.user.username = data.user.to;
				job_user.selectIdByUsername(data,function(resp2){
					if(resp2.code == 200){
						dao_user.insertMessageTp(resp1.user.id,resp2.user.id,data.user.message,function(err,code,rows){
							if(code == 100){
								response({"code" : 100, "status" : "Error in connection database"});
							}else if(code == 400){
									response({"code" : 400, "status" : "Bad Request"});
							}else{
								if(!err && rows.affectedRows > 0) {
									var row = rows[0];

						            console.log('SEND TO SOCKET ID :' +resp2.user.socket_id);
									socket.to(resp2.user.socket_id).emit('message_chat', {user : {from:data.user.from, to:resp2.user.username,message:data.user.message }});
						            console.log("send to user : " +resp2.user.username);

						            delete resp2.user.token;
						            delete resp2.user.socket_id;

									response({
										code : 200,
										description: 'OK',
										user: resp2.user
									});
								}else{
									response({
										code : 404,
										description: 'Error insert database'
									});		            	
								} 
							}
						});
					}else{
						response(resp2);			
					}
				});
			}else{
				response(resp1);		
			}
		});
}