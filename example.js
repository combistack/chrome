// Print facebook cookies

require("./index.js")("~/.config/google-chrome/Default").cookies.site.getCookies("facebook.com").then(function(data){
	console.log(data);
});

// Print all cookies

require("./index.js")("~/.config/google-chrome/Default").cookies.all.getCookies().then(function(data){
	console.log(data);
});

