const { register, login, getAllusers } = require('../controllers/userControllers');

const router = require('express').Router();

router.post('/register', register)
router.post('/login', login)
router.get('/getallusers/:id', getAllusers)

module.exports = router;