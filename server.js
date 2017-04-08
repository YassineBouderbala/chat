var my_sockets = require('./catchme/socket/socket.js');
var controllers = require('./catchme/controllers/controller.js');
var dao_user = require('./catchme/dao/user_dao.js');
var job_user = require('./job/user_job.js');
var Response = require('./catchme/entity/Response.js');

var http = require('http');
var express = require('express');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(app.listen(8080));

/* CONTROLLERS */

controllers.set(app);

console.log('Démarrage...');

/* SOCKET */

io.sockets.on('connection', function (socket) {

	try{
	    dao_user.selectUsernameToken(socket.handshake.query.token,socket.handshake.query.username,function(resp){
	    	if(resp.code == 200){
				console.log('Socket connect : '+socket.id);
				dao_user.updateSocketId(socket.handshake.query.username,socket.id,function(response){});
	    	}else{
			    socket.disconnect();
			    console.log('Socket disconnect because bad token');
	    	}
	    });
	}catch(ex){
	    socket.disconnect();
	    console.log('Socket disconnect because bad token');
	}

    my_sockets.set(socket);
});