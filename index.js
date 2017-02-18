var chrome = {
	_path: undefined,

	cookies: {
		site: require("./cookies/site")(chrome)
	}
};

module.exports = function(path){
	chrome._path = path;

	return chrome;
};

module.exports("123").cookies.site.getCookies("google.com");;

