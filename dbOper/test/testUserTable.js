var User = require('../js/tableUser.js');
//var userInfo = require('./userInfo.json');

var tbUser = new User();
//console.log("222222" + userInfo);
//tbUser.insertUser(userInfo);
tbUser.insertUser('{"account":"limh","password":"mengqiao","name":"liminhui","email":"mengmengqiaoqiao@gmail.com"}');
