var _s = require("underscore.string");

module.exports = function(chrome){
	var cookies = require("./all")(chrome);

	cookies.filter = function(row){
		return cookies._host.endsWith(_s.trim(row.host_key, "."));
	};

	cookies.getCookies = function(domain){
		cookies._host = domain;
		return cookies._getCookies();
	};


	return cookies;
}

