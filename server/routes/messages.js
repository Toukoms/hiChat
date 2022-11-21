const { sendMsg, getAllMsg } = require('../controllers/msgControllers');

const router = require('express').Router();

router.post('/sendmsg', sendMsg)
router.post('/getmsg', getAllMsg)

module.exports = router;