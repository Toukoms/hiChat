const { register, login, getAllusers, setAvart } = require('../controllers/userControllers');

const router = require('express').Router();

router.post('/register', register)
router.post('/login', login)
router.get('/getallusers/:id', getAllusers)
router.post('/setavatar/:id', setAvart)

module.exports = router;