var db = require('../db')
var Post = db.model('Post', {
    id:{
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    numbers: {
        type: Number,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productIntroduction: {
        type: String,
        required: true
    },
    productDetail: {
        type: String,
        required: true
    },
    timeLimit: {
        type: String,
        required: false
    },    
    possession: [],
    image: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: false
    },
    discountPrice: {
        type: String,
        required: false
    },
    fullPrice: {
        type: String,
        required: false
    },
    comment : []
})

module.exports = Post