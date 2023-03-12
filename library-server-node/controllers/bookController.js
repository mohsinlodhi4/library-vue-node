const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Book = require('../models/book');
const BookCheckout = require('../models/bookCheckout');
// const Token = require('../models/token');
const router = require('express').Router();
const crypto = require("crypto");
const clientURL = process.env.CLIENT_URL;
const {successResponse, errorResponse} = require('../utils/functions');

const getBooks = async (req, res)=>{
    try{
        let id = req.user_id;
        let user = await User.findById(id);
        if(!user) return res.status(400).json(errorResponse('Unauthorized.'));

        let books = await Book.find().select('_id title isbn publishYear price');

        // let bookCheckouts = await BookCheckout.find({
        //     user: req.user_id,
        //     returnedOn: null
        // }).select('_id text sender receiver createdAt').sort({'_id': -1}).exec()
        let bookCheckouts = await BookCheckout.find({
            returnedOn: null
        }).sort({'_id': -1}).exec()

        books = books.map((b)=>{
            b = b.toObject();
            b.checkedOut = bookCheckouts.find( checkout => checkout.book.toString()==b._id ) != null
            if(b.checkedOut){
                b.checkedOutBy = bookCheckouts.find( checkout => checkout.book.toString()==b._id ).borrowerName;
                b.checkedOutByUser = bookCheckouts.find( checkout => checkout.book.toString()==b._id ).user;
                b.checkedOutByPhone = bookCheckouts.find( checkout => checkout.book.toString()==b._id ).phone;
                b.checkedOutByNationalId = bookCheckouts.find( checkout => checkout.book.toString()==b._id ).nationalId;
                b.checkedOutByCheckOutDate = bookCheckouts.find( checkout => checkout.book.toString()==b._id ).dateOfCheckout;
            }
            return b;
        })

        return res.json(successResponse('Books fetched', { books }))

    }catch(e){
        console.log(e);
        return res.status(401).json(errorResponse(e.message, e.stack));
    }
}
const checkOutBook = async (req, res)=>{
    try{
        const {book_id, borrowerName, phone, nationalId, dateOfCheckout, dateOfReturn} = req.body;
        if(!book_id || !borrowerName || !phone || !nationalId || !dateOfCheckout || !dateOfReturn){
            return res.status(400).json(errorResponse('All fields are required.', req.body));
        } 

        let book = await Book.findById(book_id);
        if(!book) return res.status(400).json(errorResponse('Invalid book id.'), req.body);

        const alreadyCheckedOut = await BookCheckout.findOne({
            user: req.user_id,
            book: book_id,
            returnedOn: null
        })

        if(alreadyCheckedOut){
            return res.status(400).json(errorResponse('Book Already checked out.'), req.body);
        }

        let bookCheckout = await BookCheckout.create( {borrowerName, phone, nationalId, dateOfCheckout, dateOfReturn, user: req.user_id, book: book_id} )

        return res.json(successResponse('Book checked out successfully', { book }))

    }catch(e){
        return res.status(401).json(errorResponse(e.message));
    }
}

const checkInBook = async (req, res)=>{
    try{
        const {book_id} = req.body;
        if(!book_id){
            return res.status(400).json(errorResponse('Book Id is required.', req.body));
        } 


        let bookCheckIn = await BookCheckout.findOneAndUpdate(
            {
                user: req.user_id,
                book: book_id,
                returnedOn: null
            },
            {
                $set: {
                    returnedOn: (new Date()).toISOString()
                }
            }
        )

        return res.json(successResponse('Book checked in successfully', { bookCheckIn }))

    }catch(e){
        return res.status(401).json(errorResponse(e.message));
    }
}

const bookCheckOutHistroy = async (req, res)=>{
    try{
        const {book_id} = req.body;
        if(!book_id){
            return res.status(400).json(errorResponse('Book Id is required.', req.body));
        } 


        let bookHistory = await BookCheckout.find(
            {
                book: book_id,
            }
        ).populate('user', '-_id -createdAt -__v').sort({'_id': -1}).exec();

        return res.json(successResponse('Book history fetched successfully', { bookHistory }))

    }catch(e){
        return res.status(401).json(errorResponse(e.message));
    }
}

module.exports = {
    getBooks,
    checkInBook,
    checkOutBook,
    bookCheckOutHistroy,
}