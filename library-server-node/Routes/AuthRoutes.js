const router = require('express').Router();
const {registerUser, loginUser, userFromToken} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', userFromToken);




module.exports = router;