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
		"currentDeliverAddr", "intro", "image");
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

		var insertSql = "INSERT USER SET id = ?";
		var data = new Array();
		var id;

		myCon.connect(function(err,callback2) {
			connected = true;
			myCon.query('SELECT MAX(id) FROM USER', function (err, result) {
				if (err) {
					throw err;
					id = 0;
				} else {
					id = result + 1;
					console.log(id);
				}
			});
		}
		data.push(id);

		if (objUser.account != undefined) {
			insertSql += ", account = ?";
			data.push(objUser.account);
		}
		if (objUser.password != undefined) {
			insertSql += ", password = ?";
			data.push(objUser.password);
		}
		if (objUser.nickName != undefined) {
			insertSql += ", nickName = ?";
			data.push(objUser.nickName);
		}
		if (objUser.phone != undefined) {
			insertSql += ", phone = ?";
			data.push(objUser.phone);
		}
		if (objUser.address != undefined) {
			insertSql += ", address = ?";
			data.push(objUser.address);
		}
		if (objUser.postNum != undefined) {
			insertSql += ", postNum = ?";
			data.push(objUser.postNum);
		}
		if (objUser.birthday != undefined) {
			insertSql += ", birthday = ?";
			data.push(objUser.birthday);
		}
		if (objUser.deliverAddress != undefined) {
			insertSql += ", deliverAddress = ?";
			data.push(objUser.deliverAddress);
		}
		if (objUser.intro != undefined) {
			insertSql += ", intro = ?";
			data.push(objUser.intro);
		}
		if (objUser.image != undefined) {
			insertSql += ", image = ?";
			data.push(objUser.image);
		}


		var insertDate = moment(new Date()).format('YYYY/MM/DD HH:mm:ss');
		insertSql += ", insertDate = ?";
		data.push(insertDate);

		var updateDate = insertDate;
		insertSql += ", updateDate = ?";
		data.push(updateDate);

		var sql = insertSql  + ";";
		if (sql != undefined) {
			console.log("insert sql is:" + sql);
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
		data.push(objUser.id);

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
			data.push(objUser.nickName);
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

		var whereSql = " WHERE id = ?";
		data.push(objUser.id);

		var sql = updateSql + whereSql + ";";
		if (sql != undefined) {
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
