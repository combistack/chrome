require("./index.js")("~/.config/google-chrome/Default").cookies.site.getCookies("facebook.com").then(function(data){
	console.log(data);
});

require("./index.js")("~/.config/google-chrome/Default").cookies.all.getCookies().then(function(data){
	console.log(data);
});
;
