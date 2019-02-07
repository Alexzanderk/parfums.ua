const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Comments = new Schema({
    product_name: String, 
    author: String, 
    comment: String
}, {
        timestamps: true
    });

module.exports = mongoose.model('Comments', Comments);