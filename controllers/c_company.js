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
let update = (_state,cb)=>{
    COMPANY.findById(_state._company,(err,company)=>{
        if(!err){
            company.state=_state._state;
            company._saler=_state._saler;
            company._saler_name=_state._saler_name;
            company.save((err,updated)=>{
                if(!err){
                    cb(true,updated)
                }
            })
        }
    })
}
let findAll = (_skip,_limit,cb)=>{
    COMPANY.find({phone:new RegExp('\\d\\w+')}).skip(_skip).limit(_limit).exec((err,companies)=>{
        if(err){
            console.log("============");
            throw err;
        }
        return cb(null,companies);
    })
}

module.exports={
    add,update,findAll
}