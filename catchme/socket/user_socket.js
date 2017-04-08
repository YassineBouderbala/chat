var exports = module.exports;
var dao_user = require('../dao/user_dao.js');
var job_user = require('../../job/user_job.js');

exports.set = function(socket){

    socket.on('message/insert', function (data) {
        var path = 'message/insert/response';
        try{
            job_user.insertMessage(socket,{token:data.token,username:data.username,user: {from: data.user.from, to:data.user.to, message: data.user.message}},function(response){
                socket.emit(path,JSON.stringify(response));
            });
        }catch(ex){
            console.log('OK'+socket.id);
            socket.emit(path,JSON.stringify({code: 100, status: 'Attente de la suite de la requête.'}));
        }
    }); 

    socket.on('users/all', function (data) {
        var path = 'users/all/response';
        try{
            dao_user.selectUsernameToken(data.token,data.username,function(resp){
                if(resp.code == 200){
                    dao_user.selectAllUser(function(response){
                        socket.emit(path,response);
                    });
                }else{
                    socket.emit(path,resp);
                }
            });            
        }catch(ex){
            socket.emit(path,{code:401, description:'Unauthorized'});
        }
    }); 

    socket.on('disconnect', function () {
        console.log('DISCONNECT SOCKET : ' +socket.id);
    }); 

}