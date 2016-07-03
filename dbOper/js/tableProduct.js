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

module.exports = Product;

function Product () {
	this.tableColumns = new Array("productID", "shopID", "name", "dispName", "category", 
                "intro", "detail", "origPrice", "newPrice", "discountRate", "dispBeginDate", "dispEndDate",
		"insertDate", "updateDate", "delFlg","imgList","count","saledCount","evulation"
	);
	//this.neccessaryColumns = new Array("account");
};

/*
 *  productInfo is JSON format
 *
 */
Product.prototype.insertProduct = function(productInfo, callback) {
	try {
		// var connected = false;

		var obj = productInfo;
		if (obj.shopID == undefined || obj.name == undefined) {
			var result = {
				"code":0,
				"msg":"shopID and name are neccessary"
			}
			callback(result);
			return;
		}
		var productID = MD5(obj.shopID + obj.name).toString();

		var insertSql = "INSERT INTO PRODUCT SET productID = ?";
		var data = new Array();
		data.push(productID);

		for(var key in obj){
            		var attrName = key;
            		var attrValue = obj[key];
			if (attrName == "insertDate" || attrName == "updateDate" || attrName == "productID") {
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
							"msg":productID
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

Product.prototype.updateProduct = function(productInfo, callback) {
	try {
		// var connected = false;

		var obj = productInfo;
		if (obj.productID == undefined && (obj.shopID == undefined || obj.name == undefined)) {
			var result = {
				"code":0,
				"msg":"productID || (shopID && name ) is neccessary"
			}
			callback(result);
			return;
		}

		var updateSql = undefined;
		var data = new Array();

		for(var key in obj){
                        var attrName = key;
                        var attrValue = obj[key];
                        if (attrName == "productID" || attrName == "shopID" || attrName == "name" 
			    || attrName == "insertDate" || attrName == "updateDate") {
                                continue;
                        }
                        if (common.inArray(this.tableColumns, attrName) && attrValue != undefined) {
				if (updateSql != undefined) {
                                	updateSql += ", " + attrName + " = ?";
				} else {
					updateSql = "UPDATE PRODUCT SET " + attrName + " = ?"
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
		if (obj.productID != undefined) {
			whereSql = " WHERE productID = ?";
			data.push(obj.productID);
		} else {
			whereSql = " WHERE shopID = ? AND name = ?";
			data.push(obj.shopID);
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

Product.prototype.getProduct = function(productInfo, callback) {
	try {
		// var connected = false;

		var obj = productInfo;

		var sql = undefined;
		var selectSql = "SELECT * FROM PRODUCT";
		var whereSql = undefined;
		if (obj.productID != undefined) {
			whereSql = " WHERE productID=" + '"' + obj.productID + '"';
		} 
		/*if (obj.shopID != undefined){
			if (whereSql == undefined) {
				whereSql = " WHERE shopID=" + '"' + obj.shopID + '"';
			} else {
				whereSql += " AND shopID=" + '"' + obj.shopID + '"';
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
		}*/

		if (obj.filterAnd != undefined) {
                        var filterAndObj  = obj.filterAnd;
                        if (!common.jsonIsArray(filterAndObj)) {
                                filterAndObj = [filterAndObj];
                        }
                        // filterAnd が配列の場合, 複数指定
                        for(var i = 0; i < filterAndObj.length; i++) {
                                var objFilter = filterAndObj[i];
                                if (common.inArray(this.tableColumns, objFilter.column)) {
                                        if (whereSql == undefined) {
                                                whereSql = " WHERE " + objFilter.column + '="' + objFilter.value + '"';
                                        } else {
                                                whereSql += " AND " + objFilter.column + '="' + objFilter.value + '"';
                                        }
                                }

                        }
                }
                if (obj.filterOr != undefined) {
                        var whereOrSql = undefined;
                        var filterOrObj = obj.filterOr;
                        if (!common.jsonIsArray(filterOrObj)) {
                                filterOrObj = [filterOrObj];
                        }
                        for (var i = 0; i < filterOrObj.length; i++) {
                                var objFilter = filterOrObj[i];
                                if (common.inArray(this.tableColumns, objFilter.column)) {
                                        if (whereOrSql == undefined) {
                                                whereOrSql = " " + objFilter.column + '="' + objFilter.value + '"';
                                        } else {
                                                whereOrSql += " OR " + objFilter.column + '="' + objFilter.value + '"';
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

		if (obj.scope != undefined) {
                        var scopeSql = undefined;
                        var scopeObj = obj.scope;
                        if (!common.jsonIsArray(scopeObj)) {
                                scopeObj = [scopeObj];
                        }
                        for (var i = 0; i < scopeObj.length; i++) {
                                var scope = scopeObj[i];
                                if (common.inArray(this.tableColumns, scope.column)) {
                                        if (scope.from != undefined) {
                                                if (scopeSql == undefined) {
                                                        scopeSql = scope.column + '>="' + scope.from + '"';
                                                } else {
                                                        scopeSql += scope.column + '>="' + scope.from + '"';
                                                }
                                        }
                                        if (scope.to != undefined) {
                                                if (scopeSql == undefined) {
                                                        scopeSql = scope.column + '<="' + scope.to + '"';
                                                } else {
                                                        scopeSql += " AND " + scope.column + '<="' + scope.to + '"';
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
						"Product":results
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

Product.prototype.searchProduct = function(word, callback) {

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

                var sql = 'SELECT * FROM PRODUCT WHERE intro like "' + "%" + word + "%" + '" OR dispName like "' + "%" + word + "%" + '"';

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
                                                "Product":results
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
