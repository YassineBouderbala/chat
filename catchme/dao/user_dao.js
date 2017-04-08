var mysql_manager = require('./database_manager.js');
var exports = module.exports;

exports.selectUsernameToken = function(token, username,response){
	mysql_manager.getManager(function(resp){
		resp.getConnection(function(err,connection){
	        if (err) {
	        	console.log(err);
	          	response({"code" : 100, "status" : "Error in connection database"});
	        }else{		  
		        connection.query('SELECT * FROM User u where u.token = "'+token+'" AND u.username = "'+username+'" ',function(err,rows){
		            connection.release();
		            if(!err && rows.length > 0) {
		            	var row = rows[0]
		               	response({
		            		code : 200,
		            		user : row
		            	});
		            }else{
		               	response({
		            		code : 401,
		            		description: 'Unauthorized'
		            	});		            	
		            }         
		        });

		        connection.on('error', function(err) {      
					response({"code" : 100, "status" : "Error in connection database"});
		        });
	        }
	  	});
	});
}

exports.selectIdByUsernameTmp = function(username,response){
	try{
		mysql_manager.getManager(function(resp){
			resp.getConnection(function(err,connection){
		        if (err) {
		          	response(err,100,null);
		        }else{
			        connection.query('SELECT * FROM User u where u.username = "'+username+'" ',function(err,rows){
			            connection.release();
			            response(err,null,rows);       
			        });

			        connection.on('error', function(err) {      
						response(err,100,null);
			        });
		        }
		  	});
		});
	}catch(ex){
		response(err,400,null);		
	}
}

exports.insertMessageTp = function(from,to,message,response){
	try{
		mysql_manager.getManager(function(resp){
			resp.getConnection(function(err,connection,res){
		        if (err) {
					response(true,100,null);
		        }else{ 
			        connection.query('INSERT INTO MESSAGE VALUES(0,'+from+','+to+',0,1,"'+message+'")',function(err,rows){
			            connection.release(); 
						response(err,null,rows)       
			        });

			        connection.on('error', function(err) {      
						response(true,100,null);
			        });
		        }
		  	});
		});
	}catch(ex){
		response(err,400,null);		
	}
}

exports.selectIdByUsername = function(username,response){
	mysql_manager.getManager(function(resp){
		resp.getConnection(function(err,connection,res){
	        if (err) {
	        	console.log(err);
	          	response({"code" : 100, "status" : "Error in connection database"});
	        }else{
		        connection.query('SELECT * FROM User u where u.username = "'+username+'" ',function(err,rows){
		            connection.release();
		            if(!err && rows.length > 0) {
		            	var row = rows[0];
		               	response({
		            		code : 200,
		            		user : row
		            	});
		            }else{
		               	response({
		            		code : 401,
		            		description: 'Unauthorized'
		            	});		            	
		            }         
		        });

		        connection.on('error', function(err) {      
					response({"code" : 100, "status" : "Error in connection database"});
		        });
	        }
	  	});
	});
}

exports.selectAllUser = function(response){

	mysql_manager.getManager(function(resp){
		resp.getConnection(function(err,connection,res){
	        if (err) {
	        	console.log(err);
	          	response({"code" : 100, "status" : "Error in connection database"});
	        }else{		        
		        connection.query('SELECT * FROM User',function(err,rows){
		            connection.release();
		            if(!err) {
		            	if(rows.length > 0){
		            		response({
		            			code : 200,
		            			users : rows
		            		});	
		            	}else{
		            		response({
		            			code : 404,
		            			description : 'Not found'
		            		});			            		
		            	}

		            }          
		        });

		        connection.on('error', function(err) {      
					response({"code" : 100, "status" : "Error in connection database"});
		        });
	        }
	  	});
	});
}

exports.insertMessage = function(from,to,message,response){

	mysql_manager.getManager(function(resp){
		resp.getConnection(function(err,connection,res){
	        if (err) {
	        	console.log(err);
	          	response({"code" : 100, "status" : "Error in connection database"});
	        }else{  
		        connection.query('INSERT INTO MESSAGE VALUES(0,'+from+','+to+',0,1,"'+message+'")',function(err,rows){
		            connection.release();
		            if(!err) {
		            	if(rows.affectedRows > 0){
		            		response({
		            			code : 200,
		            			description : "OK"
		            		});	
		            	}else{
		            		response({
		            			code : 404,
		            			description : 'Not INSERT'
		            		});			            		
		            	}

		            }else{
		            	response({
		            		code : 500,
		            		description : 'Internal Error'
		            	})
		            }         
		        });

		        connection.on('error', function(err) {      
					response({"code" : 100, "status" : "Error in connection database"});
		        });
	        }
	  	});
	});
}

exports.updateSocketId = function(username,socket_id,response){

	mysql_manager.getManager(function(resp){
		resp.getConnection(function(err,connection,res){
	        if (err) {
	        	console.log(err);
	          	response({"code" : 100, "status" : "Error in connection database"});
	        }else{  
		        connection.query('Update User set socket_id="'+socket_id+'" where username = "'+username+'" ',function(err,rows){
		            connection.release();
		            if(!err) {
		            	if(rows.affectedRows > 0){
		            		response({
		            			code : 200,
		            			description : "OK"
		            		});	
		            	}else{
		            		response({
		            			code : 404,
		            			description : 'Not INSERT'
		            		});			            		
		            	}

		            }else{
		            	response({
		            		code : 500,
		            		description : 'Internal Error'
		            	});	
		            }         
		        });

		        connection.on('error', function(err) {      
					response({"code" : 100, "status" : "Error in connection database"});
		        });
	        }
	  	});
	});
}