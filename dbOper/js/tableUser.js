var MD5 = require('crypto-js/md5');

var my = require('mysql');
var config = require('./dbConfig');
var moment = require('moment');
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
		var objUser = userInfo;
		if (objUser.account == undefined || objUser.password == undefined ||
			objUser.name == undefined || objUser.nickName == undefined || objUser.email == undefined) {
			console.log("account, password, name, nickName, email are necessary");
			var result = {
				"code":0,
				"msg":"account, password, name, nickName, email are necessary"
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
			columns += ",phone";
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
			values += ',"' + objUser.image + '"';
		}
		var insertDate = moment(new Date()).format("YYYY/MM/DD HH:mm:ss");
		columns += ",insertDate";
		values += ',"' + insertDate + '"';

		var updateDate = insertDate;
		columns += ",updateDate";
		values += ',"' + updateDate + '"';
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
		var objUser = userInfo;
		if (objUser.id == undefined && objUser.account == undefined) {
			console.log("id/account is neccessary");
			var result = {
				"code":1,
				"msg":"id/account is neccessary"
			}
			callback(result);
			return;
		}

		var updateSql = "UPDATE USER SET id = ?";
		var data = new Array();
		var whereSql = " WHERE 1 = 1";
		if (objUser.id != undefined) {
			whereSql = " AND id = ?";
			data.push(objUser.id);
		} else {
			whereSql = " AND account = ?";
			data.push(objUser.account);
		}

		if (objUser.password != undefined) {
			updateSql += ", password = ?";
			data.push(objUser.password);
		}
		if (objUser.name != undefined) {
			updateSql += ", name = ?";
			data.push(objUser.name);
		}
		if (objUser.email != undefined) {
			updateSql += ", email = ?";
			data.push(objUser.email);
		}
		if (objUser.nickName != undefined) {
			updateSql += ", nickName = ?";
			data.push(objUser.nickname);
		}
		if (objUser.phone != undefined) {
			updateSql += ", phone = ?";
			data.push(objUser.phone);
		}
		if (objUser.address != undefined) {
			updateSql += ", address = ?";
			data.push(objUser.address);
		}
		if (objUser.postNum != undefined) {
			updateSql += ", postNum = ?";
			data.push(objUser.postNum);
		}
		if (objUser.birthday != undefined) {
			updateSql += ", birthday = ?";
			data.push(objUser.birthday);
		}
		if (objUser.deliverAddress != undefined) {
			updateSql += ", deliverAddress = ?";
			data.push(objUser.deliverAddress);
		}
		if (objUser.intro != undefined) {
			updateSql += ", intro = ?";
			data.push(objUser.intro);
		}
		if (objUser.image != undefined) {
			updateSql += ", image = ?";
			data.push(objUser.image);
		}

		var updateDate = moment(new Date()).format('YYYY/MM/DD HH:mm:ss');
		updateSql += ", updateDate = ?";
		data.push(updateDate);
		if (updateSql != undefined) {
			var sql = updateSql + whereSql + ";";
			console.log("update sql is:" + sql);
			myCon.connect(function(err,callback2){
				connected = true;
				myCon.query(sql, data, function(err, results){
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
		var objUser = userInfo;
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
		var objUser = userInfo;
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