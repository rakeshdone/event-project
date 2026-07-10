const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    uname:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    }
},
{timestamps:true}
)

const userModel = mongoose.model("user", userSchema);

module.exports = userModel