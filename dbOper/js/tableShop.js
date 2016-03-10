var MD5 = require('crypto-js/md5');

var my = require('mysql');
var config = require('./dbConfig');
var moment = require('moment');
var tableName = "SHOP";

var myCon = my.createConnection(config);
//myCon.connect();

module.exports = Shop;

function Shop () {
	this.tableColumns = new Array("name", "address",
		"owner", "category", "administrator", "insertDate", "updateDate", "delFlg",
		"intro", "log"
	);
	this.neccessaryColumns = new Array("name", "address", "owner", "administrator", "intro");
};

/*
 *  shopInfo is JSON format
 *
 */
Shop.prototype.insertShop = function(shopInfo, callback) {
	try {
		var connected = false;

		var objShop = shopInfo;
		if (objShop.name == undefined || objShop.owner == undefined) {
			var result = {
				"code":0,
				"msg":"name, owner  are neccessary"
			}
			callback(result);
			return;
		}
		var id = MD5(objShop.name).toString();

		var insertSql = "INSERT SHOP SET id = ?";
		var data = new Array();
		data.push(id);
		
		insertSql += ", name = ?, owner = ?";
		data.push(objShop.name);
		data.push(objShop.owner);

		if (objShop.dispName != undefined) {
			insertSql += ", dispName = ?";
			data.push(objShop.dispName);
		}
		if (objShop.address != undefined) {
			insertSql += ", address = ?";
			data.push(objShop.address);
		}
		if (objShop.administrator != undefined) {
			insertSql += ", administrator = ?";
			data.push(objShop.administrator);
		}
		if (objShop.intro != undefined) {
			insertSql += ", intro = ?";
			data.push(objShop.intro);
		}
		if (objShop.category != undefined) {
			insertSql += ", category = ?";
			data.push(objShop.category);
		}
		if (objShop.logo != undefined) {
			insertSql += ", logo = ?";
			data.push(objShop.logo);
		}

		var insertDate = moment(new Date()).format('YYYY/MM/DD HH:mm:ss');
		insertSql += ", insertDate = ?";
		data.push(insertDate);

		var updateDate = insertDate;
		insertSql += ", updateDate = ?";
		data.push(updateDate);

		myCon.connect(function(err,callback2){
			connected = true;
			myCon.query(insertSql, data, function(err, results){
				myCon.end();
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
						"id":id
					}
					callback(result);
					return;
				}
			});
		});

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

Shop.prototype.updateShop = function(shopInfo, callback) {
	try {
		var connected = false;

		var objShop = shopInfo;
		if (objShop.id == undefined && objShop.name == undefined) {
			var result = {
				"code":0,
				"msg":"id/name is neccessary"
			}
			callback(result);
			return;
		}

		var updateSql = undefined;;
		var data = new Array();
		var keyValue = undefined;
		var whereSql = undefined;

		if (objShop.dispName != undefined) {
			if (updateSql == undefined) {
				updateSql = "UPDATE SHOP SET dispName = ?";
			} else {
				updateSql += ", dispName = ?";
			}
			data.push(objShop.dispName);
		}
		if (objShop.address != undefined) {
			if (updateSql == undefined) {
				updateSql = "UPDATE SHOP SET address = ?";
			} else {
				updateSql += ", address = ?";
			}
			data.push(objShop.address);
		}
		if (objShop.owner != undefined) {
			if (updateSql == undefined) {
				updateSql = "UPDATE SHOP SET owner = ?";
			} else {
				updateSql += ", owner= ?";
			}
			data.push(objShop.owner);
		}
		if (objShop.category != undefined) {
                        if (updateSql == undefined) {
                                updateSql = "UPDATE SHOP SET category = ?";
                        } else {
                                updateSql += ", category = ?";
                        }
                        data.push(objShop.category);
                }
		if (objShop.administrator != undefined) {
                        if (updateSql == undefined) {
                                updateSql = "UPDATE SHOP SET administrator = ?";
                        } else {
                                updateSql += ", administrator = ?";
                        }
                        data.push(objShop.administrator);
                }
		if (objShop.intro != undefined) {
                        if (updateSql == undefined) {
                                updateSql = "UPDATE SHOP SET intro = ?";
                        } else {
                                updateSql += ", intro = ?";
                        }
                        data.push(objShop.intro);
                }
		var updateDate = moment(new Date()).format('YYYY/MM/DD HH:mm:ss');
		if (updateSql != undefined) {
			updateSql += ", updateDate = ?";
			data.push(updateDate);
			var whereSql = undefined
                	if (objShop.id != undefined) {
                        	whereSql = " WHERE id = ?";
                        	data.push(objShop.id);
                	} else {
				whereSql = " WHERE name = ?";
				data.push(objShop.name);
			}
			var sql = updateSql + whereSqle
			myCon.connect(function(err,callback2){
				connected = true;
				myCon.query(sql, data, function(err, results){
					myCon.end();
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

Shop.prototype.findShop = function(shopInfo, callback) {
	try {
		var connected = false;

		var objShop = shopInfo;
		if (objShop.id == undefined && objShop.name == undefined && objShop.owner == undefined) {
			var result = {
				"code":0,
				"msg":"id/name/owner is neccessary"
			}
			callback(result);
			return;
		}

		var selectSql = "SELECT * FROM SHOP";
		var whereSql = undefined;
		if (objShop.id != undefined) {
			whereSql = " WHERE id=" + '"' + objShop.id + '"';
		} else if (objShop.name != undefined){
			whereSql = " WHERE name=" + '"' + objShop.name + '"';
		} else {
			whereSql = " WHERE owner=" + '"' + objShop.owner + '"';
		}

		var sql = selectSql + whereSql + ";";
		console.log("select sql is:" + sql);
		myCon.connect(function(err,callback2){
			connected = true;
			myCon.query(sql, function(err, results){
				myCon.end();
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
