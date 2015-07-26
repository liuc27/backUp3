var db = require('../db')
var Schema = {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    shopName: [String],
    possession: [String]
}

var user = db.model('user', Schema)

module.exports = user
