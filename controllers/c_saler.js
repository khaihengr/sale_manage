'use strict';
let mongoose = require("mongoose");
let bcrypt = require("bcryptjs")

require('../models/index');
let SALER = mongoose.model('Saler');



let add = (saler,cb)=>{
    console.log(saler)
    SALER.findOne({username:saler.username}).then(res=>{
        if(!res){
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(saler.password,salt,(err,hash)=>{
                    if(err){
                        throw err;
                    }
                    saler.password = hash;
                    new SALER(saler).save().then(user=>{
                        if(user){
                            return cb(null,user);
                        }else{
                            return cb("fail",null);
                        }
                    })
                })
            })
        }
    })
}
let find_check=(_saler,cb)=>{
    SALER.findOne({username:_saler.username}).then(saler=>{
        if(!saler){
            return cb(false,null)
        }else{
            bcrypt.compare(_saler.password,saler.password,(state,math)=>{
                if(math){
                    cb(true,saler);
                }else{
                    cb(false,null);
                }
            })
        }
    })
}
let find=(_user,cb)=>{
    SALER.findOne({username:_user}).then(saler=>{
        if(!saler){
            return cb(false,null);
        }else{
            return cb(null,saler);
        }
    })
}
let get_name = (_id,cb)=>{
    SALER.findById({_id:_id}).then(user=>{
        if(user){
            return cb(true,user);
        }else{
            return cb(false,null);
        }
    })
}
module.exports= {
    add,find,find_check,get_name
}