var MD5 = require('crypto-js/md5');

var my = require('mysql');
var config = require('./dbConfig');
var moment = require('moment');
var tableName = "PURCHASE";
var Common = require('./common.js');

var myCon = my.createConnection(config);
//myCon.connect();
var connected = false;

var common = new Common();

module.exports = Purchase;

function Purchase () {
	this.tableColumns = new Array("purchaseID", "userID", "shopID", "productID", "count", 
		"usedCount", "insertDate", "updateDate", "delFlg", "useLimitDate", "paidFlg", "eluvation"
	);
};

/*
 *  purInfo is JSON format
 *
 */
Purchase.prototype.insertPur = function(purInfo, callback) {
	try {
		// var connected = false;

		var obj = purInfo;
		if (obj.userID == undefined || obj.productID == undefined || obj.shopID == undefined) {
			var result = {
				"code":0,
				"msg":"userID, productID and shopID are neccessary"
			}
			callback(result);
			return;
		}
		var purchaseID = undefined;
		purchaseID = MD5(obj.userID + obj.productID).toString();

		var insertSql = "INSERT INTO PURCHASE SET purchaseID = ?";
		var data = new Array();
		data.push(purchaseID);

		for(var key in obj){
            		var attrName = key;
            		var attrValue = obj[key];
			if (attrName == "insertDate" || attrName == "updateDate" || attrName == "purchaseID") {
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
							"msg":purchaseID
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

Purchase.prototype.updatePur = function(purInfo, callback) {
	try {
		// var connected = false;

		var obj = purInfo;
		if (obj.purchaseID == undefined && (obj.userID == undefined || obj.productID == undefined)) {
			var result = {
				"code":0,
				"msg":"purchaseID || (userID && productID) is neccessary"
			}
			callback(result);
			return;
		}

		var updateSql = undefined;
		var data = new Array();

		for(var key in obj){
                        var attrName = key;
                        var attrValue = obj[key];
                        if (attrName == "purchaseID" || attrName == "userID" || attrName == "shopID" 
			    || attrName == "productID" || attrName == "insertDate" || attrName == "updateDate") {
                                continue;
                        }
                        if (common.inArray(this.tableColumns, attrName) && attrValue != undefined) {
				if (updateSql != undefined) {
                                	updateSql += ", " + attrName + " = ?";
				} else {
					updateSql = "UPDATE PURCHASE SET " + attrName + " = ?"
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
		if (obj.purchaseID != undefined) {
			whereSql = " WHERE purchaseID = ?";
			data.push(obj.purchaseID);
		} else {
			whereSql = " WHERE userID = ? AND productID = ?";
			data.push(obj.userID);
			data.push(obj.productID);
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

Purchase.prototype.getPur = function(purInfo, callback) {
	try {
		// var connected = false;

		var obj = purInfo;

		var sql = undefined;
		var selectSql = "SELECT * FROM PURCHASE";
		var whereSql = undefined;
		if (obj.purchaseID != undefined) {
			whereSql = " WHERE purchaseID=" + '"' + obj.purchaseID + '"';
		} else if (obj.userID != undefined) {
			if (obj.shopID == undefined) {
				whereSql = " WHERE userID=" + '"' + obj.userID + '"';
			} else {
				whereSql = " WHERE userID=" + '"' + obj.userID + '" AND ' + "shopID=" + '"' + obj.shopID + '"'; 
			}
		} else {
			var result = {
                                "code":0,
                                "msg":"purchaseID || userID is neccessary"
                        }
                        callback(result);
                        return;
		}
		var limitSql = undefined;
		if (obj.start != undefined && obj.count != undefined) {
			limitSql = "limit " + obj.start + "," + obj.count;
		} else if (obj.count != undefined) {
			limitSql = "limit " + obj.count;
		}

		var sortSql = undefined;
		if (obj.sort != undefined) {
			console.log(obj.sort);
			var sortObjArr = obj.sort;
			if (!common.jsonIsArray(sortObjArr)) {
				sortObjArr = [sortObjArr];
			}
			for (var i = 0; i < sortObjArr.length; i++) {
				var sortObj = sortObjArr[i];
				if (common.inArray(this.tableColumns, sortObj.column)) {
					var type = "";
					if (sortObj.type == -1) {
						type = "desc";
					} else if (sortObj.type == 1) {
						type = "asc";
					}
					if (sortSql == undefined) {
						sortSql = "ORDER BY " + sortObj.column + " " + type;
					} else {
						sortSql += ", " + sortObj.column + " " + type;
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
						"Purchase":results
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


