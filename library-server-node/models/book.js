const mongoose = require('mongoose');

const Book = new mongoose.Schema({
    title: { type: String, required: true},
    isbn: {type: String, required: true },
    publishYear: {type: Number},
    price: {type: Number},

},{
    timestamps: true,
});


module.exports = mongoose.model('Book', Book);