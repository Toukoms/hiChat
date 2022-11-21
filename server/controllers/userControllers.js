const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password, imageAvatar } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ status: false, msg: "User already exist" });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ status: false, msg: "E-mail already exist" });
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      email: email,
      password: hashPassword,
      imageAvatar
    });
    user.password = "";
    delete user.password, hashPassword, password;
    console.log("User: account creted successfully");
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.json({ status: false, msg: "Username incorrect" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ status: false, msg: "Password incorrect" });
    user.password = "";
    delete password;
    console.log("User: login Success");
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllusers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "_id",
      "email",
      "username",
      "imageAvatar",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvart = async (req, res, next) => {
  try {
    const { imageAvatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { imageAvatar },
      { new: true }
    );
    return res.json(user);
  } catch (ex) {
    next(ex);
  }
};
