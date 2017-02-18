var chrome = {
	_path: undefined
};

module.exports = function(path){
	chrome._path = path;

	return chrome;
};

