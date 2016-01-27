var db = require('../db')
var Shop = db.model('Shop', {
    username: {
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
    },
    shopCertificate:{
        type: String,
        required: true
    },
    shopImage:{
        type: String,
        required: true
    }
})

module.exports = Shop
