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
    phonenumber: {
        type: String,
    },
    possession: []
}

var user = db.model('user', Schema)

module.exports = user