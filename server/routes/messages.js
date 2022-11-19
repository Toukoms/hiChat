const { sendMsg, getAllMsg } = require('../controllers/msgControllers');

const router = require('express').Router();

router.post('/sendmsg', sendMsg)
router.get('/getmsg', getAllMsg)

module.exports = router;