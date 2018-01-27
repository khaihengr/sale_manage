'use strict';
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Company_Schame = new Schema({
    _saler:{
        type:String,
        default:""
    },
    _saler_name:{
        type:String,
        default:""
    },
    name: {
        type: String,
        default:""
    },
    tax:{
        type:String,
        default:""
    },
    address:{
        type:String,
        default:""
    },
    town:{
        type:String,
        default:""
    },
    boss:{
        type:String,
        default:""
    },
    date_create:{
        type:String,
        default: ""
    },
    link:{
        type:String,
        default:""
    },
    phone:{
        type:String,
        default:String
    },
    state:{
        success:{
            type:Boolean,
            default:false
        },
        called:{
            type:Boolean,
            default:false
        },
        no_answer:{
            type:Boolean,
            default:false
        },
        call_later:{
            type:Boolean,
            default:false
        },
        note:{
            type:String,
            default:""
        },
    }
})

mongoose.model('Company',Company_Schame);