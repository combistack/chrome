var expandHomeDir = require('expand-home-dir')

var chrome = {
	_path: undefined
}

chrome.cookies = {
	site: require("./cookies/site")(chrome)
};

module.exports = function(path){
	chrome._path = expandHomeDir(path);

	return chrome;
};

