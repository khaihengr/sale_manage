let LocalStrategy = require("passport-local").Strategy;
let saler = require("../controllers/c_saler");

module.exports=(passport)=>{
    passport.use(new LocalStrategy((username,password,done)=>{
        let _saler = {
            username,password
        }
        saler.find_check(_saler,(state,res)=>{
            if(state){
                return done(null,res);
            }else{
                return done(null,false);
            }
        })
    }));

    passport.serializeUser((user,done)=>{
        done(null,user.username);
    })
    passport.deserializeUser((_user,done)=>{
        saler.find(_user,(err,res)=>{
            done(err,res);
        })
    })
}