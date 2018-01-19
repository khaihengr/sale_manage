'use strict';
let mongoose = require("mongoose");

require('../models/index');
let SALER = mongoose.model('Saler');


let add = (saler)=>{
    console.log(saler);
}