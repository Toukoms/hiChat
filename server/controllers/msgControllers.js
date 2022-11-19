const msgModel = require("../models/msgModel");

module.exports.sendMsg = async (req, res, next) => {
    try {
        const {message, sender, receiver} = req.body;
        const msg = await msgModel.create({
            message:message,
            sender:sender,
            receiver:receiver,
            users:[sender, receiver]
        })
        if (msg) return res.json({sended: true, msg: message})
        return res.json({sended: false})
    } catch (e) {
        next(e)
    }
}


module.exports.getAllMsg = async (req, res, next) => {
    try {
        const {sender, receiver} = req.body;
        const allMsg = await msgModel.find({uesrs: {$all: [sender, receiver]}}).sort({updatedAt: 1})
        const data = allMsg.map((msg) => {
            return {
                fromSelf: msg.sender === sender,
                msg: msg
            }
        })
        return res.json(data)
    } catch (e) {
        next(e)
    }
}