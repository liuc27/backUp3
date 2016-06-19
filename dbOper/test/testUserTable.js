var User = require('../js/tableUser');

var tbUser = new User();
//tbUser.insertUser(JSON.parse('{"account":"limh6666666666","password":"mengqiao","name":"liminhui","email":"mengmengqiaoqiao@gmail.com"}'), console.log);
//tbUser.insertUser(JSON.parse('{"account":"limh7777777777","password":"mengqiao","name":"liminhui","email":"mengmengqiaoqiao@gmail.com"}'), console.log);
//tbUser.insertUser(JSON.parse('{"account":"limh8888888888","password":"mengqiao","name":"liminhui","email":"mengmengqiaoqiao@gmail.com"}'), console.log);
//tbUser.insertUser(JSON.parse('{"account":"limh9999999999","password":"mengqiao","name":"liminhui","email":"mengmengqiaoqiao@gmail.com"}'), console.log);
//tbUser.insertUser(JSON.parse('{"account":"limh0000000000","password":"mengqiao","name":"liminhui","email":"mengmengqiaoqiao@gmail.com"}'), console.log);
//tbUser.updateUser(JSON.parse('{"account":"limh9999999999","password":"mengqiao000","name":"liminhui999","email":"mengmengqiaoqiao@gmail.com", "intro":"a father"}'), console.log);
//tbUser.getUser(JSON.parse('{"start":"2", "count": "3", "sort":[{"column": "updateDate", "type":"-1"}], "filterAnd":[{"column":"name", "value":"liminhui999"}]}'), console.log);

tbUser.getUser(JSON.parse('{"start":"0", "count": "10", "sort":[{"column": "updateDate", "type":"-1"}], "filterAnd":[{"column":"name", "value":"liminhui999"},{"column":"email", "value":"mengmengqiaoqiao000@gmail.com"}], "filterOr":[{"column":"name", "value":"liminhui"}]}'), console.log);








