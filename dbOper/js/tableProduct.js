var MD5 = require('crypto-js/md5');

var my = require('mysql');
var config = require('./dbConfig');
var moment = require('moment');
var tableName = "PRODUCT";

var myCon = my.createConnection(config);
//myCon.connect();

module.exports = Product;

function Product () {
	this.tableColumns = new Array("name", "shopId", "category", "intro", "detail",
		"originalPrice", "newPrice", "discountRate", "disBeginDate", "disEndDate", "insertDate",
		"updateDate", "delFlg", "image", "count", "saledCount", "evalution");
	this.neccessaryColumns = new Array("name", "shopId", "originalPrice","category");
};

/*
 *  productInfo is JSON format
 *
 */
Product.prototype.insertProduct = function(productInfo, callback) {
	try {
		var connected = false;

		//console.log(productInfo);
		var objProduct = productInfo;
		if (objProduct.name == undefined || objProduct.shopId == undefined ||
			objProduct.originalPrice == undefined || objProduct.image == undefined) {
			console.log("name, shopId, originalPrice, image are necessary");
			var result = {
				"code":0,
				"msg":"name, shopId, originalPrice, image are necessary"
			}
			callback(result);
			return;
		}

		var insertSql = "INSERT PRODUCT SET id = ?";
		var data = new Array();
        //var productId = MD5(objProduct.name).toString;
        myCon.connect(function(err,callback2){
            connected = true;
            myCon.query('SELECT MAC(id) FROM PRODUCT', function(err,result){
                if(err){
                    throw err;
                id = 0;
            } else {
                id = result+1;
                console.log(id);
            }})
        })

		data.push(productId);

		if (objProduct.name != undefined) {
			insertSql += ", name = ?";
			data.push(objProduct.name);
		}
		if (objProduct.shopId != undefined) {
			insertSql += ", shopId = ?";
			data.push(objProduct.shopId);
		}
        if (objProduct.category != undefined) {
            insertSql += ", category = ?";
            data.push(objProduct.category);
        }
		if (objProduct.intro != undefined) {
			insertSql += ", intro = ?";
			data.push(objProduct.intro);
		}

		if (objProduct.detail != undefined) {
			insertSql += ", detail = ?";
			data.push(objProduct.detail);
		}
		if (objProduct.originalPrice != undefined) {
			insertSql += ", originalPrice = ?";
			data.push(objProduct.originalPrice);
		}
		if (objProduct.newPrice != undefined) {
			insertSql += ", newPrice = ?";
			data.push(objProduct.newPrice);
		}
		if (objProduct.discountRate != undefined) {
			insertSql += ", discountRate = ?";
			data.push(objProduct.discountRate);
		}
        if (objProduct.disBeginDate != undefined) {
            insertSql += ", disBeginDate = ?";
            data.push(objProduct.disBeginDate);
        }
        if (objProduct.disEndDate != undefined) {
            insertSql += ", disEndDate = ?";
            data.push(objProduct.disEndDate);
        }
        if (objProduct.delFlg != undefined) {
            insertSql += ", delFlg = ?";
            data.push(objProduct.delFlg);
        }
		if (objProduct.image != undefined) {
			insertSql += ", image = ?";
			data.push(objProduct.image);
		}
        if (objProduct.count != undefined) {
            insertSql += ", count = ?";
            data.push(objProduct.count);
        }
        if (objProduct.saledCount != undefined) {
            insertSql += ", saledCount = ?";
            data.push(objProduct.saledCount);
        }
        if (objProduct.evalution != undefined) {
            insertSql += ", evalution = ?";
            data.push(objProduct.evalution);
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

Product.prototype.updateProduct = function(productInfo, callback) {
	try {
		var connected = false;

		//console.log(productInfo);
		var objProduct = productInfo;
		if (objProduct.id == undefined && objProduct.account == undefined) {
			console.log("id/account is neccessary");
			var result = {
				"code":1,
				"msg":"id/account is neccessary"
			}
			callback(result);
			return;
		}

		var updateSql = "UPDATE PRODUCT SET id = ?";
		var data = new Array();
		data.push(objProduct.id);

        if (objProduct.name != undefined) {
            updateSql += ", name = ?";
            data.push(objProduct.name);
        }
    if (objProduct.shopId != undefined) {
        updateSql += ", shopId = ?";
        data.push(objProduct.shopId);
    }
    if (objProduct.category != undefined) {
        updateSql += ", category = ?";
        data.push(objProduct.category);
    }
    if (objProduct.intro != undefined) {
        updateSql += ", intro = ?";
        data.push(objProduct.intro);
    }

    if (objProduct.detail != undefined) {
        updateSql += ", detail = ?";
        data.push(objProduct.detail);
    }
    if (objProduct.originalPrice != undefined) {
        updateSql += ", originalPrice = ?";
        data.push(objProduct.originalPrice);
    }
    if (objProduct.newPrice != undefined) {
        updateSql += ", newPrice = ?";
        data.push(objProduct.newPrice);
    }
    if (objProduct.discountRate != undefined) {
        updateSql += ", discountRate = ?";
        data.push(objProduct.discountRate);
    }
    if (objProduct.disBeginDate != undefined) {
        updateSql += ", disBeginDate = ?";
        data.push(objProduct.disBeginDate);
    }
    if (objProduct.disEndDate != undefined) {
        updateSql += ", disEndDate = ?";
        data.push(objProduct.disEndDate);
    }
    if (objProduct.delFlg != undefined) {
        updateSql += ", delFlg = ?";
        data.push(objProduct.delFlg);
    }
    if (objProduct.image != undefined) {
        updateSql += ", image = ?";
        data.push(objProduct.image);
    }
    if (objProduct.count != undefined) {
        updateSql += ", count = ?";
        data.push(objProduct.count);
    }
    if (objProduct.saledCount != undefined) {
        updateSql += ", saledCount = ?";
        data.push(objProduct.saledCount);
    }
    if (objProduct.evalution != undefined) {
        updateSql += ", evalution = ?";
        data.push(objProduct.evalution);
    }

		var updateDate = moment(new Date()).format('YYYY/MM/DD HH:mm:ss');
		updateSql += ", updateDate = ?";
		data.push(updateDate);

		var whereSql = " WHERE id = ?";
		//data.push(objProduct.id);

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

Product.prototype.findProduct = function(productInfo, callback) {
	try {
		var connected = false;

		//console.log(productInfo);
		var objProduct = productInfo;
		if (objProduct.id == undefined && objProduct.name == undefined ) {
			console.log("id/name is neccessary");
			var result = {
				"code":1,
				"msg":"id/name is neccessary"
			}
			callback(result);
			return;
		}

		var selectSql = "SELECT * FROM PRODUCT";
		var whereSql = undefined;
		if (objProduct.id != undefined) {
			whereSql = " WHERE id=" + '"' + objProduct.id + '"';
		} else if (objProduct.name != undefined){
			whereSql = " WHERE name=" + '"' + objProduct.name + '"';
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
						"Product":results
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

//myCon.end();
