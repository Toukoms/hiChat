const User = require("../models/userModel");
const bcrypt = require('bcrypt')

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) return res.json({ status: false, msg: "User already exist" })
        const emailCheck = await User.findOne({ email });
        if (emailCheck) return res.json({ status: false, msg: "E-mail already exist" })
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username: username,
            email: email,
            password: hashPassword
        })
        delete user.password, hashPassword, password;
        return res.json({ status: true, user });
    } catch(ex) {
        next(ex)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.json({ status: false, msg: "Username incorrect" });
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.json({ status: false, msg: "Password incorrect" });
        delete user.password, password;
        return res.json({ status: true, user });
    } catch(ex) {
        next(ex)
    }
}

module.exports.getAllusers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req._params.id} }).select([
            '_id',
            'email',
            'username',
            'imageAvatar'
        ]);
        return res.json(users);
    } catch(ex) {
        next(ex)
    }
}
