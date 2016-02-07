var MD5 = require('crypto-js/md5');

var my = require('mysql');
var config = require('./dbConfig');
var tableName = "USER";

var myCon = my.createConnection(config);
//myCon.connect();

module.exports = User;

function User () {
	this.tableColumns = new Array("account", "password", "name", "nickName", "phone", "address",
		"postNum", "email", "birthday", "adminFlg", "certificatedFlg", "deliverAddress",
		"currentDeliverAddr", "intro", "image"
	);
	this.neccessaryColumns = new Array("account", "password", "name", "email");
};

/*
*  userInfo is JSON format
*
*/
User.prototype.insertUser = function(userInfo, callback) {
	try {
		var connected = false;

		//console.log(userInfo);
		var objUser = JSON.parse(userInfo);
		if (objUser.account == undefined || objUser.password == undefined || 
		    objUser.name == undefined || objUser.email == undefined) {
			console.log("account, password, name, email are neccessary");
			var result = {
				"code":0,
				"msg":"account, password, name, email are neccessary"
			}
			callback(result);
			return;
		}
		var id = MD5(objUser.account).toString();
		
		var sql = "INSERT INTO USER";
		var columns = "id,account,password,name,email";
		var values = '"' + id +  '"' + ',"' + objUser.account + '","' + objUser.password + '","' 
				+ objUser.name + '","' + objUser.email + '"';
		if (objUser.nickName != undefined) {
			columns += ",nickName";
			values +=  ',"' + objUser.nickName + '"';
		}
		if (objUser.phone != undefined) {
			columns += ",nickName";
			values += ',"' + objUser.phone + '"';
		}
		if (objUser.address != undefined) {
			columns += ",address";
			values += ',"' + objUser.address + '"';
		}
		if (objUser.postNum != undefined) {
			columns += ",postNum";
			values += ',"' + objUser.postNum + '"';
		}
		if (objUser.birthday != undefined) {
			columns += ",birthday";
			values += ',"' + objUser.birthday + '"';
		}
		if (objUser.deliverAddress != undefined) {
			columns += ",deliverAddress";
			values += ',"' + objUser.deliverAddress + '"';
		} else {
			//columns += ",deliverAddress";
		}
		if (objUser.intro != undefined) {
			columns += ",intro";
			values += ',"' + objUser.intro + '"';
		}
		if (objUser.image != undefined) {
			columns += ",image";
			values += ',"' + objUser.image + '"'
		}
		sql += " (" + columns + ") VALUES(" + values + ");";
		//console.log("sql is:" + sql);
		myCon.connect(function(err,callback2){
			//console.log(callback2);
			connected = true;
			myCon.query(sql, function(err, results){
				myCon.end();
		        	if(err) {
 					var result = {
						"code":1,
						"msg":err
					}
                                        callback(result);
             				return;
        			} else {
					var result = {
						"code":0,
						"id":id
					}
					callback(result);
					return;
        			}
 				console.log("aaaaaaa");
			});
		});
                
		// "birthday", "adminFlg", "certificatedFlg", "deliverAddress","currentDeliverAddr", "intro", "image"
	} catch (e) {
		if (connected == true) {
			console.log("catch exception, database connected, close it");
			myCon.end();
		} else {
			console.log("catch exception, database dose not connet");
		}
		console.log("catch exception:" + e.name + "; msg:" + e.message);
		var result = {
			"code":0,
			"msg":"catch exception:" + e.message
		}
		callback(result);
	}

        
};

User.prototype.updateUser = function(userInfo, callback) {
	try {
		var connected = false;

                //console.log(userInfo);
                var objUser = JSON.parse(userInfo);
		if (objUser.id == undefined && objUser.account == undefined) {
                        console.log("id/account is neccessary");
                        var result = {
				"code":1,
				"msg":"id/account is neccessary"
			}
			callback(result);
			return;
                }

		var updateSql = "UPDATE USER SET";
		var keyValue = undefined;
		var whereSql = undefined;
		if (objUser.id != undefined) {
			whereSql = " WHERE id=" + '"' + objUser.id + '"';
		} else {
			whereSql = " WHERE account=" + '"' + objUser.account + '"';
		}

		if (objUser.password != undefined) {
			if (keyValue == undefined) {
				keyValue = ' password="' + objUser.password + '"';
			} else {
				keyValue += ',password="' + objUser.password + '"';
			}
		}
		if (objUser.name != undefined) {
                        if (keyValue == undefined) {
                                keyValue = ' name="' + objUser.name + '"';
                        } else {
                                keyValue += ',name="' + objUser.name + '"';
                        }
                }
		if (objUser.email != undefined) {
                        if (keyValue == undefined) {
                                keyValue = ' email="' + objUser.email + '"';
                        } else {
                                keyValue += ',email="' + objUser.email + '"';
                        }
                }
                if (objUser.nickName != undefined) {
			if (keyValue == undefined) {
                                keyValue = ' nickName="' + objUser.nickName + '"';
                        } else {
                                keyValue += ',nickName="' + objUser.nickName + '"';
                        }
                }
                if (objUser.phone != undefined) {
			if (keyValue == undefined) {
                                keyValue = ' phone="' + objUser.phone + '"';
                        } else {
                                keyValue += ',phone="' + objUser.phone + '"';
                        }
                }
                if (objUser.address != undefined) {
			if (keyValue == undefined) {
                                keyValue = ' address="' + objUser.address + '"';
                        } else {
                                keyValue += ',address="' + objUser.address + '"';
                        }
                }
                if (objUser.postNum != undefined) {
			if (keyValue == undefined) {
                                keyValue = ' postNum="' + objUser.postNum + '"';
                        } else {
                                keyValue += ',postNum="' + objUser.postNum + '"';
                        }
                }
                if (objUser.birthday != undefined) {
               		if (keyValue == undefined) {
                                keyValue = ' birthday="' + objUser.birthday + '"';
                        } else {
                                keyValue += ',birthday="' + objUser.birthday + '"';
                        }
		}
                if (objUser.deliverAddress != undefined) {
                	if (keyValue == undefined) {
                                keyValue = ' deliverAddress="' + objUser.deliverAddress + '"';
                        } else {
                                keyValue += ',deliverAddress="' + objUser.deliverAddress + '"';
                        }
		}
                if (objUser.intro != undefined) {
                	if (keyValue == undefined) {
                                keyValue = ' intro="' + objUser.intro + '"';
                        } else {
                                keyValue += ',intro="' + objUser.intro + '"';
                        }
		}
                if (objUser.image != undefined) {
                	if (keyValue == undefined) {
                                keyValue = ' image="' + objUser.image + '"';
                        } else {
                                keyValue += ',image="' + objUser.image + '"';
                        }
		}
		if (keyValue != undefined) {
			var sql = updateSql + keyValue + whereSql + ";";
			console.log("update sql is:" + sql);
			myCon.connect(function(err,callback2){
                        	connected = true;
                        	myCon.query(sql, function(err, results){
                                	myCon.end();
                                	if(err) {
                                        	var result = {
                                                	"code":1,
                                                	"msg":err
                                        	}
                                        	callback(result);
                                        	return;
                                	} else {
                                        	var result = {
                                                	"code":0,
                                                	"msg":"Success"
                                        	}
                                        	callback(result);
                                        	return;
                                	}
                        	});
                	});
		}
	} catch (e) {
		if (connected == true) {
			myCon.end();
		}
		console.log("catch exception:" + e.name + "; msg:" + e.message);
		var result = {
                        "code":0,
                        "msg":"catch exception:" + e.message
                }
                callback(result);
	}
};

User.prototype.findUser = function(userInfo, callback) {
	try {
		var connected = false;

                //console.log(userInfo);
                var objUser = JSON.parse(userInfo);
                if (objUser.id == undefined && objUser.account == undefined && objUser.email == undefined) {
                        console.log("id/account/email is neccessary");
                        var result = {
                                "code":1,
                                "msg":"id/account/email is neccessary"
                        }
                        callback(result);
                        return;
                }

                var selectSql = "SELECT * FROM USER";
                var whereSql = undefined;
                if (objUser.id != undefined) {
                        whereSql = " WHERE id=" + '"' + objUser.id + '"';
                } else if (objUser.account != undefined){
                        whereSql = " WHERE account=" + '"' + objUser.account + '"';
                } else {
			whereSql = " WHERE email=" + '"' + objUser.email + '"';
		}

                var sql = selectSql + whereSql + ";";
                console.log("select sql is:" + sql);
                myCon.connect(function(err,callback2){
                        connected = true;
                        myCon.query(sql, function(err, results){
                                myCon.end();
                                if(err) {
                                        var result = {
                                                "code":1,
                                                "msg":err
                                        }
                                        callback(result);
                                        return;
                                } else {
                                        var result = {
                                                "code":0,
                                                "User":results
                                        }
                                        callback(result);
                                        return;
                                }
                        });
        	});
	} catch (e) {
		if (connected == true) {
                        myCon.end();
                }
                console.log("catch exception:" + e.name + "; msg:" + e.message);
                var result = {
                        "code":0,
                        "msg":"catch exception:" + e.message
                }
                callback(result);
	}
};

User.prototype.login = function(userInfo, callback) {
        try {
                var connected = false;

                //console.log(userInfo);
                var objUser = JSON.parse(userInfo);
                if (objUser.account == undefined || objUser.password == undefined) {
                        console.log("account and password are neccessary");
                        var result = {
                                "code":1,
                                "msg":"account and password are neccessary"
                        }
                        callback(result);
                        return;
                }

                var sql = 'SELECT count(*) as count FROM USER WHERE account="' + objUser.account + '" AND password="' + objUser.password + '";';
             	console.log("select sql is:" + sql);
                myCon.connect(function(err,callback2){
                        connected = true;
                        myCon.query(sql, function(err, results){
                                myCon.end();
                                if(err) {
                                        var result = {
                                                "code":1,
                                                "msg":err
                                        }
                                        callback(result);
                                        return;
                                } else {
					var dbRet = JSON.stringify(results);
					var jsonObj = JSON.parse(dbRet);
					var result = undefined;
					if (jsonObj[0].count == "0") {
                                        	result = {
                                                	"code":0,
                                                	"msg":"account or password is wrong"
                                        	}
					} else {
						result = {
                                                        "code":1,
                                                        "msg":"login success"
                                                }
					}
                                        callback(result);
                                        return;
                                }
                        });
                });

	} catch (e) {
                if (connected == true) {
                        myCon.end();
                }
                console.log("catch exception:" + e.name + "; msg:" + e.message);
                var result = {
                        "code":0,
                        "msg":"catch exception:" + e.message
                }
                callback(result);
        }
}
//myCon.end();
