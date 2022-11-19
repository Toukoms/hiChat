const mongoose = require("mongoose");


const userShema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        min:3,
        max:45
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
        min:8
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    imageAvatar:{
        type:String,
        default:""
    }
});

module.exports = mongoose.model('users', userShema);