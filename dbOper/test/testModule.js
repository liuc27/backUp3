var dbOper = require('db-oper');

var userOper = dbOper.getUserInstance();
userOper.insertUser('{"account":"limh","password":"mengqiao","name":"liminhui","email":"mengmengqiaoqiao@gmail.com"}');


//var tbUser = new User();
//tbUser.insertUser('{"account":"limh","password":"mengqiao","name":"liminhui","email":"mengmengqiaoqiao@gmail.com"}');
