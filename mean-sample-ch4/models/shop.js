var db = require('../db')
var Shop = db.model('Shop', {
    userName: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true
    },
    shopCategory: {
        type: String,
        required: true
    },
    shopAddress: {
        type: String,
        required: true
    },
    shopIntroduction:{
        type: String,
        required: true
    },
    shopContactWay:{
        type: String,
        required: false
    },
    userCertificate:{
        type: String,
        required: true
    }
})

module.exports = Shop
