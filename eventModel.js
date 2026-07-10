const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    eventname:{
        type:String,
        required:true
    },
    organizername:{
        type:String,
        required:true
    },
    eventdate:{
        type:Number,
        required:true
    
    },
    venue:{
        type:String,
        required:true
    },
    registrationfees:{
        type:Number,
        required:true
    },
},
{timestamps:true}
)

const eventModel = mongoose.model("event", eventSchema);

module.exports = eventModel



    