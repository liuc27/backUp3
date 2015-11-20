var my = require('mysql');
var config = require('./dbConfig');

var myCon = my.createConnection(config);
myCon.connect();

myCon.query('INSERT INTO USER (id,account,password,name,email) VALUES("a68548ee2c65aa442d2adffdf47fce47","limh","mengqiao","liminhui","mengmengqiaoqiao@gmail.com");', function(err, results){
	if(err) {
		console.log("hava error!");
		console.log(err);
	} else {
		console.log("get results!")
		console.log(results);
	}
	
});

function registerUser (User) {
	var user = JSON.parse(User);
	
}

myCon.end();
