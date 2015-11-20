var MD5 = require('crypto-js/md5');

var my = require('mysql');
var config = require('./dbConfig');
var tableName = "USER";

console.log(config.host);
console.log(config.idontknow);
if (config.idontknow == undefined) {
	console.log("undefine");
}

var myCon = my.createConnection(config);
myCon.connect();

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
		console.log(userInfo);
		var objUser = JSON.parse(userInfo);
		console.log("after parse json");
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
		myCon.query(sql, function(err, results){
		        if(err) {
                		console.log("hava error!");
                		console.log(err);
        		} else {
                		console.log("insert user successfully!")
                		console.log(results);
        		}
		});
	
		// "birthday", "adminFlg", "certificatedFlg", "deliverAddress","currentDeliverAddr", "intro", "image"
	} catch (e) {
		console.log("catch exception:" + e.name + "; msg:" + e.message);
	}
};


myCon.end();
