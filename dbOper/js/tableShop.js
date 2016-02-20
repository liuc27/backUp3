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

		//console.log(shopInfo);
		var objShop = shopInfo;
		if (objShop.name == undefined || objShop.address == undefined ||
			objShop.owner == undefined || objShop.administrator == undefined || objShop.intro == undefined) {
			console.log("name, address, owner, administrator and intro are neccessary");
			var result = {
				"code":0,
				"msg":"name, address, owner, administrator and intro are neccessary"
			}
			callback(result);
			return;
		}
		var id = MD5(objShop.name).toString();

		var sql = "INSERT INTO SHOP";
		var columns = "id,name,address,owner,administrator,intro";
		var values = '"' + id +  '"' + ',"' + objShop.name + '","' + objShop.address + '","'
			+ objShop.owner + '","'+ objShop.administrator + '","'  + objShop.intro + '"';
		if (objShop.category != undefined) {
			columns += ",category";
			values +=  ',"' + objShop.category + '"';
		}
		if (objShop.delFlg != undefined) {
			columns += ",delFlg";
			values += ',"' + objShop.delFlg + '"';
		} else {
			columns += ",delFlg";
			values += ',"' + '1' + '"'; //default delFlg value
		}
		if (objShop.logo != undefined) {
			columns += ",logo";
			values += ',"' + objShop.logo + '"';
		}

		var insertDate = moment(new Date()).format('YYYY/MM/DD HH:mm:ss');
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

Shop.prototype.updateShop = function(shopInfo, callback) {
	try {
		var connected = false;

		//console.log(shopInfo);
		var objShop = shopInfo;
		if (objShop.id == undefined && objShop.name == undefined) {
			console.log("id/name is neccessary");
			var result = {
				"code":1,
				"msg":"id/name is neccessary"
			}
			callback(result);
			return;
		}

		var updateSql = "UPDATE SHOP SET";
		var keyValue = undefined;
		var whereSql = undefined;
		if (objShop.id != undefined) {
			whereSql = " WHERE id=" + '"' + objShop.id + '"';
		} else {
			whereSql = " WHERE name=" + '"' + objShop.name + '"';
		}

		if (objShop.address != undefined) {
			if (keyValue == undefined) {
				keyValue = ' address="' + objShop.address + '"';
			} else {
				keyValue += ',address="' + objShop.address + '"';
			}
		}
		if (objShop.owner != undefined) {
			if (keyValue == undefined) {
				keyValue = ' owner="' + objShop.owner + '"';
			} else {
				keyValue += ',owner="' + objShop.owner + '"';
			}
		}
		if (objShop.email != undefined) {
			if (keyValue == undefined) {
				keyValue = ' email="' + objShop.email + '"';
			} else {
				keyValue += ',email="' + objShop.email + '"';
			}
		}
		if (objShop.category != undefined) {
			if (keyValue == undefined) {
				keyValue = ' category="' + objShop.category + '"';
			} else {
				keyValue += ',category="' + objShop.category + '"';
			}
		}
		if (objShop.administrator != undefined) {
			if (keyValue == undefined) {
				keyValue = ' administrator="' + objShop.administrator + '"';
			} else {
				keyValue += ',administrator="' + objShop.administrator + '"';
			}
		}
		if (objShop.updateDate != undefined) {
			if (keyValue == undefined) {
				keyValue = ' updateDate="' + objShop.updateDate + '"';
			} else {
				keyValue += ',updateDate="' + objShop.updateDate + '"';
			}
		}
		if (objShop.insertDate != undefined) {
			if (keyValue == undefined) {
				keyValue = ' insertDate="' + objShop.insertDate + '"';
			} else {
				keyValue += ',insertDate="' + objShop.insertDate + '"';
			}
		}
		if (objShop.delFlg != undefined) {
			if (keyValue == undefined) {
				keyValue = ' delFlg="' + objShop.delFlg + '"';
			} else {
				keyValue += ',delFlg="' + objShop.delFlg + '"';
			}
		}
		if (objShop.intro != undefined) {
			if (keyValue == undefined) {
				keyValue = ' intro="' + objShop.intro + '"';
			} else {
				keyValue += ',intro="' + objShop.intro + '"';
			}
		}
		if (objShop.logo != undefined) {
			if (keyValue == undefined) {
				keyValue = ' logo="' + objShop.logo + '"';
			} else {
				keyValue += ',logo="' + objShop.logo + '"';
			}
		}

		var updateDate = moment(new Date()).format('YYYY/MM/DD HH:mm:ss');
		keyValue += ' updateDate="' + updateDate + '"';
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

Shop.prototype.findShop = function(shopInfo, callback) {
	try {
		var connected = false;

		//console.log(shopInfo);
		var objShop = shopInfo;
		if (objShop.id == undefined && objShop.name == undefined && objShop.owner == undefined) {
			console.log("id/name/owner is neccessary");
			var result = {
				"code":1,
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
			whereSql = " WHERE name=" + '"' + objShop.account + '"';
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
						"code":1,
						"msg":err
					}
					callback(result);
					return;
				} else {
					var result = {
						"code":0,
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
