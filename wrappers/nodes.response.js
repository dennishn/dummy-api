exports.wrapResponse = function(response) {

	if(Array.isArray(response)) {
		return new WrappedResponseArray(response);
	} else if(typeof response === 'object') {
		return new WrappedResponseObject(response);
	}

};

/*function wrap(response){
	if(_.isArray(response)){
		return new WrappedResponseList(response);
	}else if(_.isObject(response)){
		return new WrappedResponseObject(response);
	}
}

function _wrappedResponseObject(response){
	this.id = uuid.v1();
	this.data = response;
	this.version = 'v1';
	this.date = new Date();
}

function _wrappedResponseList(response){
	this.length = response.length;
	this.data = response;
	this.version = 'v1';
	this.date = new Date();
}

module.exports = wrap;*/