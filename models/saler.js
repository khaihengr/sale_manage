'use strict';
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Saler_Chema = new Schema({
    _companies:[{type:Schema.Types.ObjectId,ref:'Company'}],
    username:String,
    password:String,
    fullname:String,
    called:{
        type:Number,
        default:0
    },
    success:{
        type:Number,
        default:0
    }
});
mongoose.model('Saler',Saler_Chema);