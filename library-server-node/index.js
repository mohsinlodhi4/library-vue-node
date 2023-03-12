const express = require('express');
const helmet = require('helmet');
const http = require('http');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authRouter = require('./Routes/AuthRoutes');
const bookRouter = require('./Routes/BookRoutes');
const authMiddleware = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();
require('./database/connection')();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());
app.use(cors({
    // origin:'http://localhost:4000',
    origin:'*',
}));

app.use(errorHandler);

// Routes
app.use('/auth',authRouter);
app.use('/books', authMiddleware, bookRouter);

app.get('/', (req, res)=> res.send('Working'))

const PORT  = process.env.PORT || 3000;
app.listen(PORT,()=> console.log(`Node App Running at http://localhost:${PORT}`));