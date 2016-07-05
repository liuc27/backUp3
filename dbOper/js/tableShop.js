var MD5 = require('crypto-js/md5');

var my = require('mysql');
var config = require('./dbConfig');
var moment = require('moment');
var tableName = "SHOP";
var Common = require('./common.js');

var myCon = my.createConnection(config);
//myCon.connect();
var connected = false;

var common = new Common();

module.exports = Shop;

function Shop () {
	this.tableColumns = new Array("shopID", "owner", "name", "dispName", "address", "category", 
                "administrator", "latitude", "longitude",
		"insertDate", "updateDate", "delFlg","intro","logo"
	);
	//this.neccessaryColumns = new Array("account");
};

/*
 *  shopInfo is JSON format
 *
 */
Shop.prototype.insertShop = function(shopInfo, callback) {
	try {
		// var connected = false;

		var obj = shopInfo;
		if (obj.owner == undefined || obj.name == undefined || obj.dispName == undefined) {
			var result = {
				"code":0,
				"msg":"owner, name and dispName are neccessary"
			}
			callback(result);
			return;
		}
		var shopID = MD5(obj.owner + obj.name).toString();

		var insertSql = "INSERT INTO SHOP SET shopID = ?";
		var data = new Array();
		data.push(shopID);

		for(var key in obj){
            		var attrName = key;
            		var attrValue = obj[key];
			if (attrName == "insertDate" || attrName == "updateDate" || attrName == "shopID") {
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
							"msg":shopID
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

Shop.prototype.updateShop = function(shopInfo, callback) {
	try {
		// var connected = false;

		var obj = shopInfo;
		if (obj.shopID == undefined && (obj.owner == undefined || obj.name == undefined)) {
			var result = {
				"code":0,
				"msg":"shopID || (owner && name ) is neccessary"
			}
			callback(result);
			return;
		}

		var updateSql = undefined;
		var data = new Array();

		for(var key in obj){
                        var attrName = key;
                        var attrValue = obj[key];
                        if (attrName == "shopID" || attrName == "owner" || attrName == "name" 
			    || attrName == "insertDate" || attrName == "updateDate") {
                                continue;
                        }
                        if (common.inArray(this.tableColumns, attrName) && attrValue != undefined) {
				if (updateSql != undefined) {
                                	updateSql += ", " + attrName + " = ?";
				} else {
					updateSql = "UPDATE SHOP SET " + attrName + " = ?"
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
		if (obj.shopID != undefined) {
			whereSql = " WHERE shopID = ?";
			data.push(obj.shopID);
		} else {
			whereSql = " WHERE owner = ? AND name = ?";
			data.push(obj.owner);
			data.push(obj.name);
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

Shop.prototype.getShop = function(shopInfo, callback) {
	try {
		// var connected = false;

		var obj = shopInfo;

		var sql = undefined;
		var selectSql = "SELECT * FROM SHOP";
		var whereSql = undefined;
		if (obj.shopID != undefined) {
			whereSql = " WHERE shopID=" + '"' + obj.shopID + '"';
		}
		if (obj.owner != undefined){
			if (whereSql == undefined) {
				whereSql = " WHERE owner=" + '"' + obj.owner + '"';
			} else {
				whereSql += " AND owner=" + '"' + obj.owner + '"';
			}
		}
		if (obj.name != undefined){
			if (whereSql == undefined) {
				whereSql = " WHERE name=" + '"' + obj.name + '"';
			} else {
				whereSql += " AND name=" + '"' + obj.name + '"';
			}
		}
		if (obj.category != undefined) {
			if (whereSql == undefined) {
                                whereSql = " WHERE category=" + '"' + obj.category + '"';
                        } else {
                                whereSql += " AND category=" + '"' + obj.category + '"';
                        }
		}
		if (obj.search != undefined) {
                        var searchObj = obj.search;
                        if (!common.jsonIsArray(searchObj)) {
                                searchObj = [searchObj];
                        }
                        var searchSql = undefined;
                        for (var i = 0; i < searchObj.length; i++) {
                                var srch = searchObj[i];
                                if (srch.column == "intro" || srch.colum == "dispName") {
                                        if (searchSql == undefined) {
                                                searchSql = srch.column + ' like "%' + srch.word + '%"';
                                        } else {
                                                searchSql += " OR " + srch.column + ' like "%' + srch.word + '%"';
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
						"Shop":results
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

Shop.prototype.searchShop = function(word, callback) {

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

                var sql = 'SELECT * FROM SHOP WHERE intro like "' + "%" + word + "%" + '" OR dispName like "' + "%" + word + "%" + '"';

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
                                                "Shop":results
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
