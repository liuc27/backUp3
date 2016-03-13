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
		"intro", "logo");
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

		var sql = "INSERT SHOP SET id = ?";
		var data = new Array();
		data.push(id);

		if (objShop.name != name) {
			insertSql += ", category = ?";
			data.push(objUser.name);
		}
		if (objShop.address != undefined) {
			insertSql += ", address = ?";
			data.push(objUser.address);
		}
		if (objShop.owner != undefined) {
			insertSql += ", owner = ?";
			data.push(objUser.owner);
		}
		if (objShop.category != undefined) {
			insertSql += ", category = ?";
			data.push(objUser.category);
		}
		if (objShop.administrator != undefined) {
			insertSql += ", administrator = ?";
			data.push(objUser.administrator);
		}
		if (objShop.delFlg != undefined) {
			insertSql += ", delFlg = ?";
			data.push(objUser.delFlg);
		}else{
			insertSql += ", delFlg = ?";
			data.push('1');
		}
		if (objShop.intro != undefined) {
			insertSql += ", intro = ?";
			data.push(objUser.intro);
		}
		if (objShop.logo != undefined) {
			insertSql += ", logo = ?";
			data.push(objUser.logo);
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
			myCon.connect(function (err, callback2) {
				//console.log(callback2);
				connected = true;
				myCon.query(sql, data, function (err, results) {
					myCon.end();
					if (err) {
						var result = {
							"code": 1,
							"msg": err
						}
						callback(result);
						return;
					} else {
						var result = {
							"code": 0,
							"id": id
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

Shop.prototype.updateShop = function(shopInfo, callback) {
	try {
		var connected = false;

		//console.log(shopInfo);
		var objShop = shopInfo;

		if (objShop.id == undefined) {
			console.log("id is neccessary");
			var result = {
				"code":1,
				"msg":"id is neccessary"
			}
			callback(result);
			return;
		}

		var updateSql = "UPDATE SHOP SET id = ?";
		var data = new Array();

		data.push(objShop.id);

		if (objShop.name != name) {
			updateSql += ", category = ?";
			data.push(objShop.name);
		}
		if (objShop.address != undefined) {
			updateSql += ", address = ?";
			data.push(objShop.address);
		}
		if (objShop.owner != undefined) {
			updateSql += ", owner = ?";
			data.push(objShop.owner);
		}
		if (objShop.category != undefined) {
			updateSql += ", category = ?";
			data.push(objShop.category);
		}
		if (objShop.administrator != undefined) {
			updateSql += ", administrator = ?";
			data.push(objShop.administrator);
		}
		if (objShop.delFlg != undefined) {
			updateSql += ", delFlg = ?";
			data.push(objShop.delFlg);
		}else{
			updateSql += ", delFlg = ?";
			data.push('1');
		}
		if (objShop.intro != undefined) {
			updateSql += ", intro = ?";
			data.push(objShop.intro);
		}
		if (objShop.logo != undefined) {
			updateSql += ", logo = ?";
			data.push(objShop.logo);
		}

		var updateDate = moment(new Date()).format('YYYY/MM/DD HH:mm:ss');
		updateSql += ", updateDate = ?";
		data.push(updateDate);

		var whereSql = " WHERE id = ?";
		data.push(objShop.id);

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

Shop.prototype.findShop = function(shopInfo, callback) {
	try {
		var connected = false;

		//console.log(shopInfo);
		var objShop = shopInfo;
		if (objShop.id == undefined || objShop.name == undefined || objShop.owner == undefined) {
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
