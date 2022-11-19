const mongoose = require("mongoose");

const msgShema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    users: Array
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", msgShema);
