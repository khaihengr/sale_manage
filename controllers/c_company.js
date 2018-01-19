'use strict';
let mongoose = require("mongoose");

require('../models/index');
let COMPANY = mongoose.model('Company');


let add = (company)=>{
    let new_company = new COMPANY(company);
    new_company.save().then((res)=>{
        console.log(res);
    })
}

module.exports={
    add
}