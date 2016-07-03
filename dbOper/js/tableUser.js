var MD5 = require('crypto-js/md5');

var my = require('mysql');
var config = require('./dbConfig');
var moment = require('moment');
var tableName = "USER";
var Common = require('./common.js');

var myCon = my.createConnection(config);
//myCon.connect();
var connected = false;

var common = new Common();

module.exports = User;

function User () {
	this.tableColumns = new Array("account", "password", "name", "nickName", "phone", "address",
		"postNum", "email", "birthday", "oauthSource", "birthday", "adminFlg", "certificatedFlg", 
		"gender", "deliverAddress", "currentDeliverAddr", "intro", "image", "point", "idCard",
		"insertDate", "updateDate", "delFlg"
	);
	//this.neccessaryColumns = new Array("account");
};

/*
 *  userInfo is JSON format
 *
 */
User.prototype.insertUser = function(userInfo, callback) {
	try {
		// var connected = false;

		var objUser = userInfo;
		if (objUser.account == undefined || objUser.oauthSource == undefined) {
			var result = {
				"code":0,
				"msg":"account and oauthSource are neccessary"
			}
			callback(result);
			return;
		}
		var userID = MD5(objUser.account + objUser.oauthSource).toString();

		var insertSql = "INSERT INTO USER SET userID = ?";
		var data = new Array();
		data.push(userID);

		for(var key in objUser){
            		var attrName = key;
            		var attrValue = objUser[key];
			if (attrName == "insertDate" || attrName == "updateDate" || attrName == "userID") {
				continue;
			}
			if (common.inArray(this.tableColumns, attrName) && attrValue != undefined) {
				insertSql += ", " + attrName + " = ?";
				data.push(attrValue);
			}
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
					if (connected == true) {
						connected = false;
						myCon.end();
					}
					if(err) {
						var result = {
							"code":0,
							"msg":err
						}
						callback(result);
						return;
					} else {
						var result = {
							"code":1,
							"msg":userID
						}
						callback(result);
						return;
					}
				});
			});
		}
	} catch (e) {
		if (connected == true) {
			connected = false;
			myCon.end();
		}
		if (e.stack) {
                        console.log("catch exception:" + e.name);
                        console.log(e.stack);
                } else {
                        console.log("catch exception:" + e.name + "; msg:" + e.message, e);
                }
		var result = {
			"code":0,
			"msg":"catch exception:" + e.message
		}
		callback(result);
	}


};

User.prototype.updateUser = function(userInfo, callback) {
	try {
		// var connected = false;

		//console.log(userInfo);
		var objUser = userInfo;
		if (objUser.userID == undefined && (objUser.account == undefined || objUser.oauthSource == undefined)) {
			var result = {
				"code":0,
				"msg":"userID || (account && oauthSource ) is neccessary"
			}
			callback(result);
			return;
		}

		var updateSql = undefined;
		var data = new Array();

		for(var key in objUser){
                        var attrName = key;
                        var attrValue = objUser[key];
                        if (attrName == "userID" || attrName == "account" 
			    || attrName == "insertDate" || attrName == "updateDate"
			    || attrName == "oauthSource") {
                                continue;
                        }
                        if (common.inArray(this.tableColumns, attrName) && attrValue != undefined) {
				if (updateSql != undefined) {
                                	updateSql += ", " + attrName + " = ?";
				} else {
					updateSql = "UPDATE USER SET " + attrName + " = ?"
				}
                                data.push(attrValue);
                        }
                }

		var updateDate = moment(new Date()).format('YYYY/MM/DD HH:mm:ss');
		if (updateSql == undefined) {
			var result = {
                        	"code":0,
                                "msg":"変更内容を指定ください"
                        }
                        callback(result);
                        return;
		} else {
			updateSql += ", updateDate = ?";
		}
		data.push(updateDate);

		var whereSql = undefined;
		if (objUser.userID != undefined) {
			whereSql = " WHERE userID = ?";
			data.push(objUser.userID);
		} else {
			whereSql = " WHERE account = ? AND oauthSource = ?";
			data.push(objUser.account);
			data.push(objUser.oauthSource);
		}

		var sql = updateSql + whereSql + ";";
		console.log("update sql:" + sql);
		console.log(data);
		if (sql != undefined) {
			myCon.connect(function(err,callback2){
				connected = true;
				myCon.query(sql, data, function(err, results){
					if (connected == true) {
						connected = false;
						myCon.end();
					}
					if(err) {
						var result = {
							"code":0,
							"msg":err
						}
						callback(result);
						return;
					} else {
						var result = {
							"code":1,
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
			connected = false;
			myCon.end();
		}
		if (e.stack) {
			console.log("catch exception:" + e.name);
			console.log(e.stack);
		} else {
			console.log("catch exception:" + e.name + "; msg:" + e.message, e);
		}
		var result = {
			"code":0,
			"msg":"catch exception:" + e.message
		}
		callback(result);
	}
};

User.prototype.getUser = function(userInfo, callback) {
	try {
		// var connected = false;

		var objUser = userInfo;
		/*if (objUser.userID == undefined && objUser.account == undefined && objUser.email == undefined) {
			console.log("userID/account/email is neccessary");
			var result = {
				"code":0,
				"msg":"userID/account/email is neccessary"
			}
			callback(result);
			return;
		}*/

		var sql = undefined;
		var selectSql = "SELECT * FROM USER";
		var whereSql = undefined;
		if (objUser.userID != undefined) {
			whereSql = " WHERE userID=" + '"' + objUser.userID + '"';
		} else if (objUser.account != undefined){
			whereSql = " WHERE account=" + '"' + objUser.account + '"';
			if (objUser.oauthSource != undefined) {
				whereSql += " AND oauthSource=" + '"' + objUser.oauthSource + '"';
			} else {
				whereSql += ' AND oauthSource="local"';
			}
		} else if (objUser.email != undefined){
			whereSql = " WHERE email=" + '"' + objUser.email + '"';
		}
                if (objUser.search != undefined) {
			var searchObj = objUser.search;
			if (!common.jsonIsArray(searchObj)) {
				searchObj = [searchObj];
			}
			var searchSql = undefined;
			for (var i = 0; i < searchObj.length; i++) {
				var obj = searchObj[i];
				if (obj.column == "intro" || obj.colum == "nickName") {
					if (searchSql == undefined) {
						searchSql = obj.column + ' like "%' + obj.word + '%"';
					} else {
						searchSql += " OR " + obj.column + ' like "%' + obj.word + '%"';
					}
				}
			}
			if (searchSql != undefined) {
				if (whereSql == undefined) {
					whereSql = " WHERE (" + searchSql + ")";
				} else {
					whereSql += " AND (" + searchSql + ")";
				}
			}
		}
		// 下記フィルターは同じカラムで、複数値でAND、ORの状況まだ対応していない
		if (objUser.filterAnd != undefined) {
			var filterAndObj  = objUser.filterAnd;
			if (!common.jsonIsArray(filterAndObj)) {
				filterAndObj = [filterAndObj];
			}
			// filterAnd が配列の場合, 複数指定
			for(var i = 0; i < filterAndObj.length; i++) {
    				var obj = filterAndObj[i];
				if (common.inArray(this.tableColumns, obj.column)) {
					if (whereSql == undefined) {
                                               	whereSql = " WHERE " + obj.column + '="' + obj.value + '"';
                                       	} else {
                                               	whereSql += " AND " + obj.column + '="' + obj.value + '"';
                                       	}
				}

			}
		}
		if (objUser.filterOr != undefined) {
			var whereOrSql = undefined;
			var filterOrObj = objUser.filterOr;
			if (!common.jsonIsArray(filterOrObj)) {
				filterOrObj = [filterOrObj];
			}
			for (var i = 0; i < filterOrObj.length; i++) {
				var obj = filterOrObj[i];
				if (common.inArray(this.tableColumns, obj.column)) {
					if (whereOrSql == undefined) {
                                                whereOrSql = " " + obj.column + '="' + obj.value + '"';
                                        } else {
                                                whereOrSql += " OR " + obj.column + '="' + obj.value + '"';
                                        }
				}
			}
			if (whereOrSql != undefined) {
				if (whereSql == undefined) {
					whereSql = " WHERE (" + whereOrSql + ")";
				} else {
					whereSql += " OR (" + whereOrSql + ")";
				}
			}
		}
		if (objUser.scope != undefined) {
			var scopeSql = undefined;
			var scopeObj = objUser.scope;
			if (!common.jsonIsArray(scopeObj)) {
				scopeObj = [scopeObj];
			}
			for (var i = 0; i < scopeObj.length; i++) {
				var obj = scopeObj[i];
				if (common.inArray(this.tableColumns, obj.column)) {
					if (obj.from != undefined) {
						if (scopeSql == undefined) {
							scopeSql = obj.column + '>="' + obj.from + '"'; 
						} else {
							scopeSql += obj.column + '>="' + obj.from + '"';
						}
					}
					if (obj.to != undefined) {
						if (scopeSql == undefined) {
                                                        scopeSql = obj.column + '<="' + obj.to + '"';
                                                } else {
                                                        scopeSql += " AND " + obj.column + '<="' + obj.to + '"';
                                                }
					}
				}
			}
			if (scopeSql != undefined) {
				if (whereSql == undefined) {
                                        whereSql = " WHERE (" + scopeSql + ")";
                                } else {
                                        whereSql += " AND (" + scopeSql + ")";
                                }
			}
		}
		var limitSql = undefined;
		if (objUser.start != undefined && objUser.count != undefined) {
			limitSql = "limit " + objUser.start + "," + objUser.count;
		} else if (objUser.count != undefined) {
			limitSql = "limit " + objUser.count;
		}

		var sortSql = undefined;
		if (objUser.sort != undefined) {
			console.log("===== sort begin ====");
			console.log(objUser.sort);
			console.log("===== sort end ====");
			var sortObj = objUser.sort;
			if (!common.jsonIsArray(sortObj)) {
				sortObj = [sortObj];
			}
			for (var i = 0; i < sortObj.length; i++) {
				var obj = sortObj[i];
				if (common.inArray(this.tableColumns, obj.column)) {
					var type = "";
					if (obj.type == -1) {
						type = "desc";
					} else if (obj.type == 1) {
						type = "asc";
					}
					if (sortSql == undefined) {
						sortSql = "ORDER BY " + obj.column + " " + type;
					} else {
						sortSql += ", " + obj.column + " " + type;
					}
				}
			}
		}

		sql = selectSql;
		if (whereSql != undefined) {
			sql += " " + whereSql;
		}
		if (sortSql != undefined) {
			sql += " " + sortSql;
		}
		if (limitSql != undefined) {
                        sql += " " + limitSql;
                }

		console.log(sql);
		myCon.connect(function(err,callback2){
			connected = true;
			myCon.query(sql, function(err, results){
				if (connected == true) {
					connected = false;
					myCon.end();
				}
				if(err) {
					var result = {
						"code":0,
						"msg":err
					}
					callback(result);
					return;
				} else {
					var result = {
						"code":1,
						"User":results
					}
					callback(result);
					return;
				}
			});
		});
	} catch (e) {
		if (connected == true) {
			connected = false;
			myCon.end();
		}
		if (e.stack) {
                        console.log("catch exception:" + e.name);
                        console.log(e.stack);
                } else {
                        console.log("catch exception:" + e.name + "; msg:" + e.message, e);
                }
		var result = {
			"code":0,
			"msg":"catch exception:" + e.message
		}
		callback(result);
	}
};

User.prototype.searchUser = function(word, callback) {
	try {
		if (word == undefined) {
                        console.log("word is neccessary");
                        var result = {
                                "code":0,
                                "msg":"word is neccessary"
                        }
                        callback(result);
                        return;
                }

		var sql = 'SELECT * FROM USER WHERE intro like "' + "%" + word + "%" + '" OR nickName like "' + "%" + word + "%" + '"';

		console.log("SQL:" + sql);
                myCon.connect(function(err,callback2){
                        connected = true;
                        myCon.query(sql, function(err, results){
                                if (connected == true) {
                                        connected = false;
                                        myCon.end();
                                }
                                if(err) {
                                        var result = {
                                                "code":0,
                                                "msg":err
                                        }
                                        callback(result);
                                        return;
                                } else {
                                        var result = {
                                                "code":1,
                                                "User":results
                                        }
                                        callback(result);
                                        return;
                                }
                        });
                });
	} catch (e) {
                if (connected == true) {
                        connected = false;
                        myCon.end();
                }
                if (e.stack) {
                        console.log("catch exception:" + e.name);
                        console.log(e.stack);
                } else {
                        console.log("catch exception:" + e.name + "; msg:" + e.message, e);
                }
                var result = {
                        "code":0,
                        "msg":"catch exception:" + e.message
                }
                callback(result);
	}
};

User.prototype.login = function(userInfo, callback) {
	try {
		// var connected = false;

		var objUser = userInfo;
		if (objUser.account == undefined || objUser.password == undefined) {
			console.log("account and password are neccessary");
			var result = {
				"code":0,
				"msg":"account and password are neccessary"
			}
			callback(result);
			return;
		}

		var sql = 'SELECT count(*) as count FROM USER WHERE account="' + objUser.account + '" AND password="' + objUser.password + '";';
		myCon.connect(function(err,callback2){
			connected = true;
			myCon.query(sql, function(err, results){
				if (connected == true) {
					connected = false;
					myCon.end();
				}
				if(err) {
					var result = {
						"code":0,
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
			connected = false;
			myCon.end();
		}
		if (e.stack) {
                        console.log("catch exception:" + e.name);
                        console.log(e.stack);
                } else {
                        console.log("catch exception:" + e.name + "; msg:" + e.message, e);
                }
		var result = {
			"code":0,
			"msg":"catch exception:" + e.message
		}
		callback(result);
	}
}


