const mongoose = require('mongoose');

const BookCheckout = new mongoose.Schema({
    borrowerName: { type: String, required: true},
    phone: {type: String, required: true },
    nationalId: {type: String, required: true },
    dateOfCheckout: {type: Date, default: Date.now },
    dateOfReturn: {type: Date, required: true },
    returnedOn: {type: Date },
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    book: {type: mongoose.Types.ObjectId, ref: 'Book'},

},{
    timestamps: true,
});


module.exports = mongoose.model('BookCheckout', BookCheckout);