'use strict';
let mongoose = require("mongoose");

require('../models/index');
let COMPANY = mongoose.model('Company');


let add = (company)=>{

    COMPANY.findOne({phone:company.phone}).then(res=>{
        if(!res){
            let new_company = new COMPANY(company);
            new_company.save().then((res)=>{
                console.log(res);
            })
        }
    })


}
let update = (_company,_state,cb)=>{
    let update_company = new COMPANY();
    update_company.findByIdAndUpdate(_company,{state:_state},(err,res)=>{
        if(!err){
            return cb(null,res);
        }else{
            return cb(err,null);
        }
    })
}

module.exports={
    add
}