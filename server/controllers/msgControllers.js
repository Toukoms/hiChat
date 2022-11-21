const msgModel = require("../models/msgModel");

module.exports.sendMsg = async (req, res, next) => {
  try {
    const { message, sender, receiver } = req.body;
    const msg = await msgModel.create({
      message: message,
      sender: sender,
      receiver: receiver,
      users: [sender, receiver],
    });
    if (msg) {
      console.log(
        "Messages: Message sended correctly from id:" +
          sender +
          " to id:" +
          receiver +
          "\n\t" +
          message
      );
      return res.json({ sended: true, msg: message });
    }
    return res.json({ sended: false });
  } catch (e) {
    next(e);
  }
};

module.exports.getAllMsg = async (req, res, next) => {
  try {
    const { sender, receiver } = req.body;
    console.log(sender, receiver);
    const allMsg = await msgModel
      .find({
        $or: [
          { $and: [{ sender: sender }, { receiver: receiver }] },
          { $and: [{ sender: receiver }, { receiver: sender }] },
        ],
      })
      .all()
      .sort({ updatedAt: 1 });
    const data = allMsg.map((msg) => {
      return {
        fromSelf: msg.sender == sender,
        msg: msg.message,
        sharedAt: msg.createdAt,
      };
    });
    console.log("Messages: Get all messages " + allMsg);
    return res.json(data);
  } catch (e) {
    next(e);
  }
};
