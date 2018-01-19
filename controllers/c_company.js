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
let update = (_company,_state,cb)=>{
    COMPANY.findByIdAndUpdate(_company,{state:_state},(err,res)=>{
        if(!err){
            return cb(null,res);
        }else{
            return cb(err,null);
        }
    })
}

module.exports={
    add,update
}