var db = require('../db')
var Shop = db.model('Shop', {
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
    shopImage:{
        type: String,
        required: false
    }
})

module.exports = Shop