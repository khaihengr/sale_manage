'use strict';
let mongoose = require("mongoose");

require('../models/index');
let COMPANY = mongoose.model('Company');


let add = (company,cb)=>{
    let new_company = new COMPANY(company);
    new_company.save().then((res)=>{
        if (res) {
            cb(true, res);
        } else {
            cb(false, res);
        }
    })
}
let update_state = (_state,cb)=>{
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
let update_comp = (comp,cb)=>{
    COMPANY.findById(comp._id,(err,company)=>{
        if(!err){
            company.link=comp._state;
            company.phone=comp.phone;
            company.name=comp.name;
            company.town=comp.town;
            company.boss=comp.boss;
            company.date_create=comp.date_create;
            company.address=comp.address;
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
let find_by_company_name=(_skip,_company,cb)=>{
    COMPANY.find({'name':new RegExp(_company,'i')}).skip(_skip).limit(10).exec((err,companies)=>{
        if(!err){
            cb(true,companies);
        }
    })
}
let find_by_boss_name=(_skip,_boss,cb)=>{
    COMPANY.find({'boss':new RegExp(_boss,'i')}).skip(_skip).limit(10).exec((err,companies)=>{
        if(!err){
            cb(true,companies);
        }
    })
}
let find_by_phone_number=(_skip,_phone,cb)=>{
    COMPANY.find({'phone':new RegExp(_phone,'i')}).skip(_skip).limit(10).exec((err,companies)=>{
        if(!err){
            cb(true,companies);
        }
    })
}
let filter_by_success = (_skip,cb)=>{
    COMPANY.find({'state.success':true}).skip(_skip).limit(10).exec((err,companies)=>{
        if(!err){
            cb(true,companies);
        }
    })
}
let filter_by_called = (_skip,cb)=>{
    COMPANY.find({'state.called':true}).skip(_skip).limit(10).exec((err,companies)=>{
        if(!err){
            cb(true,companies);
        }
    })
}
let filter_by_call_later = (_skip,cb)=>{
    COMPANY.find({'state.call_later':true}).skip(_skip).limit(10).exec((err,companies)=>{
        if(!err){
            cb(true,companies);
        }
    })
}
let filter_by_no_anwser = (_skip,cb)=>{
    COMPANY.find({'state.no_answer':true}).skip(_skip).limit(10).exec((err,companies)=>{
        if(!err){
            cb(true,companies);
        }
    })
}
module.exports={
    add,update_state,findAll,find_by_boss_name,find_by_company_name,find_by_phone_number,
    filter_by_no_anwser,filter_by_call_later,filter_by_called,filter_by_success,update_comp
}