var method = Response.prototype;

function Response(code) {
	this.setCode(code);
}

method.setCode = function(code) {
	switch(code) {
	    case 200:
			this._code = 200;
			this._description = 'OK';
	        break;
	    case 401:
			this._code = 401;
			this._description = 'Unauthorized';
	        break;
	    case 500:
				this._code = 401;
				this._description = 'Unauthorized';
	        break;
	    default:
			this._code = 200;
			this._description = 'OK';
	}
};

module.exports = Response;