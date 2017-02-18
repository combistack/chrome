var sqlite3 = require('sqlite3').verbose();

var cookies = {
	_chrome: undefined,

	getCookies: function(domain){
		return new Promise(function(resolve, reject){
			var db = new sqlite3.Database('/home/nemanjan00/.config/google-chrome/Default/Cookies');

			db.serialize(function() {
				db.each("SELECT * FROM cookies", function(err, row) {
					console.log(row.value);
				});
			});

			db.close();
		});
	}
}

module.exports = function(chrome){
	cookies._chrome = chrome;

	return cookies;
}

