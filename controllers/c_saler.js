'use strict';
let mongoose = require("mongoose");
let bcrypt = require("bcryptjs")

require('../models/index');
let SALER = mongoose.model('Saler');



let add = (saler,cb)=>{
    let new_saler = new SALER(saler);
    SALER.findOne({username:saler.username}).then(res=>{
        if(!res){

        }
    })
}