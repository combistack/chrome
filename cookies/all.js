var sqlite3 = require('sqlite3').verbose();
var crypto = require('crypto');

var cookies = {
	_chrome: undefined,

	format: function(key){
		if (key[0] >>> 7 === 0) {
			return key.toString('hex');
		}

		return new BN(key.toString('hex'), 16).notn(192).add(new BN(1)).toString(16);
	},

	_decrypt: function(data){
		return new Promise(function(resolve, reject){
			crypto.pbkdf2("peanuts", "saltysalt", 1, 16, "sha1", function(err, key) {
				var cipher = crypto.createDecipheriv('aes-128-cbc', key, "                ");

				if((data+"").indexOf("v10") == 0){
					data = data.slice(3, data.length);
				}

				try{
					resolve(cipher.update(data, 'utf8', 'utf8') + cipher.final('utf8'));
				} catch(e){
					reject(e);
				}
			});
		});
	},

	filter: function(row){
		return true;
	},

	_getCookies: function(){
		return new Promise(function(resolve, reject){
			console.log(cookies._chrome._path+'/Cookies');
			var db = new sqlite3.Database(cookies._chrome._path+'/Cookies');

			db.all("SELECT * FROM cookies", function(err, rows) {
				var allPromises = [];

				rows.forEach(function(row){
					if(cookies.filter(row)){
						allPromises.push(new Promise(function(resolve, reject){
							var promises = [];

							if(row.value == ""){
								promises.push(cookies._decrypt(row.encrypted_value));
							}

							Promise.all(promises).then(function(data){
								if(row.value == ""){
									row.value = data[0];
								}

								resolve(row);
							});
						}));
					}
				});

				Promise.all(allPromises).then(function(data){
					console.log(data);
				});
			});

			db.close();
		});
	},
	getCookies: function(){
		return cookies._getCookies();
	}
}

module.exports = function(chrome){
	cookies._chrome = chrome;

	return cookies;
}

