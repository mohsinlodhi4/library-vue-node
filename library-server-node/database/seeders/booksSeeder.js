const Book = require('../../models/book');

require('dotenv').config();
const connect = require('../connection');

connect().then( async ()=>{

    const books = [
        {
            title: "Harry Potter",
            isbn: '123123',
            publishYear: 2002,
            price: 100,
        },
        {
            title: "Cherry Potter",
            isbn: '456456',
            publishYear: 2000,
            price: 105,
        },
        {
            title: "Batman",
            isbn: '098890',
            publishYear: 2003,
            price: 200,
        },
        {
            title: "Minions",
            isbn: '6780983',
            publishYear: 1995,
            price: 50,
        },
        {
            title: "ABC",
            isbn: '6966890',
            publishYear: 2002,
            price: 100,
        },
        
    ];
    
    try {
        await Book.deleteMany();
        const res = await Book.insertMany(books);
        console.log('books inserted', res);
      } catch (err) {
        // Handle errors
        console.log(err);
      }
      process.exit();
});


