var MD5 = require('crypto-js/md5');

var moment = require('moment');

module.exports = Common;

function Common () {
};

/*
 *  Determin whether the JSON is JSONObject or JSONArray
 *
 */
Common.prototype.jsonIsArray = function(jsonObj) {
	return Object.prototype.toString.call(jsonObj) === '[object Array]';
}

Common.prototype.inArray = function(arr, ele) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === ele) {
			return true;
		};
	};
	return false;
}
