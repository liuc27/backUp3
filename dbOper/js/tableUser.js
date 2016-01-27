var MD5 = require('crypto-js/md5');

var my = require('mysql');
var config = require('./dbConfig');
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
User.prototype.insertUser = function(userInfo) {
	try {
		var connected = false;

		console.log(userInfo);
		var objUser = JSON.parse(userInfo);
		if (objUser.account == undefined || objUser.password == undefined || 
		    objUser.name == undefined || objUser.email == undefined) {
			console.log("account, password, name, email are neccessary");
			throw ("please set account,password,name,email");
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
			columns += ",nickName";
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
			values += ',"' + objUser.image + '"'
		}
		sql += " (" + columns + ") VALUES(" + values + ");";
		console.log("sql is:" + sql);
		myCon.connect(function(err,callback){
			connected = true;
			myCon.query(sql, function(err, results){
		        	if(err) {
                			console.log("hava error!");
                			console.log(err);
        			} else {
                			console.log("insert user successfully!")
                			console.log(results);
        			}
				myCon.end();
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
		throw e;
	}
};

User.prototype.updateUser = function(userInfo) {
};

User.prototype.findUser = function(userInfo) {
};

//myCon.end();
