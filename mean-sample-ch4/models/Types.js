var db = require('../db')
var Type = db.model('Type', {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

module.exports = Type