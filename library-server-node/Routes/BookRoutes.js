const router = require('express').Router();
const {getBooks, checkOutBook, checkInBook, bookCheckOutHistroy} = require('../controllers/bookController');

router.get('/list', getBooks);
router.post('/checkout', checkOutBook);
router.post('/checkin', checkInBook);
router.post('/history', bookCheckOutHistroy);




module.exports = router;