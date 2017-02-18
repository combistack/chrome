var sqlite3 = require('sqlite3').verbose();
var crypto = require('crypto');
var BN = require('bn.js');

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

	getCookies: function(domain){
		return new Promise(function(resolve, reject){
			var db = new sqlite3.Database('/home/nemanjan00/.config/google-chrome/Default/Cookies');

			db.serialize(function() {
				db.each("SELECT * FROM cookies", function(err, row) {
					if(row.host_key == domain){
						var promises = [];

						if(row.value == ""){
							promises.push(cookies._decrypt(row.encrypted_value));
						}

						Promise.all(promises).then(function(data){
							if(row.value == ""){
								row.value = data[0];
							}

							console.log(row.name);
							console.log(row.value);
						});
					}
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

